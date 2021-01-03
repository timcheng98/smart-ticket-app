import Web3 from 'web3';
import Ticket from '../../../../abis/Ticket.json';
// import Event from '../../../abis/Event.json';
import _ from 'lodash';
import { getStore } from '../../redux/store/configureStore';
import * as CommonActions from '../../redux/actions/common'

export class EventAPI {
	constructor() {
		this.contract = {};
		this.web3 = {};
		this.accounts = [];
		this.address = '';
		this.default_account = '0x11aefC18c5ED4a9d7668B6Ef9cF0bE450aa43A03';
		this.default_account_private_key = '6cac840b1b489ae59b62ccd3e2a6a48665c30aa6eae86af4aed8b23e3e89c44e'
	}

	getWeb3() {
		return this.web3;
	}

	async init() {
		// await this.loadWeb3();
		await this.loadRemoteWeb3();
		await this.loadBlockchainData();
		return true
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			this.web3 = window.web3;
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
			this.web3 = window.web3;
		} else {
			window.alert(
				'Non-Ethereum browser detected. You should consider trying MetaMask!'
			);
		}
	}

	async loadRemoteWeb3() {
		let provider = 'http://172.16.210.165:7545'
		window.web3 = new Web3(provider);
		this.web3 = window.web3;
	}

	async loadBlockchainData() {
		// Load accountc
		this.accounts = await this.web3.eth.getAccounts();
		const networkId = await this.web3.eth.net.getId();
		const networkData = Ticket.networks[networkId];
		if (networkData) {
			const abi = Ticket.abi;
			const address = networkData.address;
			this.address = address;
			this.contract = new this.web3.eth.Contract(abi, address);
		} else {
			window.alert('Smart contract not deployed to detected network.');
		}
	}

	async getEventAll() {
		let events = [];
		let total = await this.contract.methods.eventId.call({
			from: this.accounts[0],
		});
		if (!total) return [];

		console.log('total', total)
		for (let i = 0; i < this.web3.utils.hexToNumber(total._hex); i++) {
			let data = await this.contract.methods
				.events(i)
				.call({ from: this.accounts[0] });
			let eventDetail = JSON.parse(data.detail);
			eventDetail = {
				...eventDetail,
				eventId: i,
			};
			events.push(eventDetail);
		}
		return events;
	}

	async getEvent(eventId) {
		let event = await this.contract.methods
			.getEvent(eventId)
			.call({ from: this.accounts[0] });
		return JSON.parse(event);
	}

	async ownerOf(eventId) {
		let tickets = await this.getTicketAll();
		let ticketOwner = [];
		let promise = tickets.map(async (val) => {
			let owner = await this.contract.methods
				.ownerOf(val.ticketId)
				.call({ from: this.accounts[0] });
			if (owner === this.accounts[0]) {
				ticketOwner.push(val);
			}
		});
		await Promise.all(promise);

		tickets = _.groupBy(ticketOwner, 'eventId');
		let ticketIdArr = [];
		_.map(tickets, (val, key) => {
			ticketIdArr.push(_.toInteger(key));
		});

		let events = {};
		promise = _.map(ticketIdArr, async (val, key) => {
			let event = await this.getEvent(val);
			events = {
				...events,
				[val]: event,
			};
		});
		await Promise.all(promise);

		let eventArr = [];
		_.each(tickets, (val, key) => {
			let detailObj = {
				total: val.length,
				event: events[key],
			};
			eventArr.push(detailObj);
		});
		return eventArr;
	}

	async createEvent(_eventObj) {
		let eventObj = JSON.stringify(_eventObj);
		let result = await this.contract.methods
			.createEvent(this.accounts[0], eventObj)
			.send({ from: this.accounts[0] });
		return result;
	}

	async testMint() {
		await this.contract.methods.mint(['123']).send({ from: this.accounts[0] });
	}

	async getTicketAll() {
		let tickets = [];
		let total = await this.contract.methods.ticketCount.call({
			from: this.accounts[0],
		});
		// console.log(total)
		// if (!total) return [];

		for (let i = 0; i < this.web3.utils.hexToNumber(total._hex); i++) {
			let data = await this.contract.methods
				.tickets(i)
				.call({ from: this.accounts[0] });
			let ticketDetail = JSON.parse(data.ticketDetail);
			ticketDetail = {
				...ticketDetail,
				eventId: this.web3.utils.hexToNumber(data.eventId._hex),
				ticketId: this.web3.utils.hexToNumber(data.ticketId._hex),
			};
			tickets.push(ticketDetail);
		}

		return tickets;
	}

	async getOnSellTicketsAll(type) {
		let total = await this.contract.methods.ticketCount.call({
			from: this.accounts[0],
		});

		let onSellTicketIdArr = [];


		for (let i = 0; i < this.web3.utils.hexToNumber(total._hex); i++) {
			let data = await this.contract.methods
				.tickets(i)
				.call({ from: this.accounts[0] });
			let ticketDetail = JSON.parse(data.ticketDetail);

			let ticket_owner = await this.contract.methods.ownerOf(this.web3.utils.hexToNumber(data.ticketId._hex)).call({from: this.accounts[0]});
			if (ticket_owner === this.default_account) {
				ticketDetail = {
					...ticketDetail,
					eventId: this.web3.utils.hexToNumber(data.eventId._hex),
					ticketId: this.web3.utils.hexToNumber(data.ticketId._hex),
				};
				onSellTicketIdArr.push(ticketDetail);
			}
		}

		return onSellTicketIdArr;
	}

	async getOnSellTicketsByArea(area) {
		let total = await this.contract.methods.ticketCount.call({
			from: this.accounts[0],
		});

		let onSellTicketIdArr = [];


		for (let i = 0; i < this.web3.utils.hexToNumber(total._hex); i++) {
			let data = await this.contract.methods
				.tickets(i)
				.call({ from: this.accounts[0] });
			let ticketDetail = JSON.parse(data.ticketDetail);

			let ticket_owner = await this.contract.methods.ownerOf(this.web3.utils.hexToNumber(data.ticketId._hex)).call({from: this.accounts[0]});
			if (ticket_owner === this.default_account && area === ticketDetail.area) {
				ticketDetail = {
					...ticketDetail,
					eventId: this.web3.utils.hexToNumber(data.eventId._hex),
					ticketId: this.web3.utils.hexToNumber(data.ticketId._hex),
				};
				onSellTicketIdArr.push(ticketDetail);
			}
		}

		return onSellTicketIdArr;
	}

	async autoSignTicketTransaction({tickets, total}) {

		let onSellTicketIdArr = [];
		let onSellTicketCount = 0;
		let promise = tickets.map( async (item) => {
			let ticket_owner = await this.contract.methods.ownerOf(item.ticketId).call({from: this.accounts[0]});
			if (ticket_owner === this.default_account && onSellTicketCount < total) {
				onSellTicketIdArr.push(item.ticketId);
				onSellTicketCount++;
			}
		});

		await Promise.all(promise);
		console.log('onSellTicketArr', onSellTicketIdArr);

		let transaction;
		if (total > 1) {
			transaction = this.contract.methods
			.multiTransferFrom(
				this.default_account,
				this.accounts[0],
				onSellTicketIdArr
			);
		} else {
			let ticketId = onSellTicketIdArr[0];
			transaction = this.contract.methods
			.safeTransferFrom(
				this.default_account,
				this.accounts[0],
				ticketId
			);
		}

		await this.signTransaction(
			transaction,
			(confirmedMessage) => {
				console.log(' ticket confirmedMessage', confirmedMessage);
				return getStore().dispatch(CommonActions.setEvents(true))
			}
		);



		// console.log('cp01');
		// let count = 0;
		// let _tickets = tickets;
		// console.log('tickets', _tickets)
		// // console.log('total', total)
		// let ticketArr = _tickets.map( async (item, index, _tickets) => {

		// 	let ticket_owner = await this.contract.methods.ownerOf(item.ticketId).call({from: this.accounts[0]});
		// 	if (ticket_owner === this.default_account) {
		// 		if (count === _.toInteger(total)) {
		// 			_tickets = _tickets.concat(_tickets.splice(index, _tickets.length - index));
		// 			return;
		// 		}
	
		// 	console.log('cp02 test', ticket_owner)

		// 	// let transaction =  this.contract.methods
		// 	// 	.safeTransferFrom(
		// 	// 		ticket_owner,
		// 	// 		this.accounts[0],
		// 	// 		item.ticketId
		// 	// 	)
		// 	// await this.signTransaction(
		// 	// 	transaction,
		// 	// 	(confirmedMessage) => {
		// 	// 		console.log(' ticket confirmedMessage', confirmedMessage);
		// 	// 		return getStore().dispatch(CommonActions.setEvents(true))
		// 	// 	}
		// 	// )
		// 	count++;
		// }
		// });

		// await Promise.all(ticketArr);
		// console.log(' ----- finish ticket transaction ----- ')
	}

	async autoCreateTickets(_seats) {
		let transaction = this.contract.methods
		.mint(_seats);
		return this.signTransaction(transaction, function(confirmedMessage) {
			console.log(' ticket confirmedMessage', confirmedMessage);
		}); 
	}

	async createSeats(_seats) {
		console.log(_seats);
		let result = await this.contract.methods
			.mint(_seats)
			.send({ from: this.accounts[0] });
	}

	async autoSignEventTransaction(_eventObj) {
		let eventObj = JSON.stringify(_eventObj);
		let transaction = this.contract.methods.createEvent(
			this.accounts[0],
			eventObj
    );
		let somearray = [];
		return this.signTransaction(transaction, function(confirmedMessage) {
			somearray.push(confirmedMessage);
			return getStore().dispatch(CommonActions.setEvents(true))

      console.log(somearray[0]);
   });
  
	}

	async signTransaction(transaction, cb) {
		let gas = await transaction.estimateGas({ from: this.default_account });
		let nonce = await this.web3.eth.getTransactionCount(this.default_account);

		let options = {
			to: this.address,
			data: transaction.encodeABI(),
			gas,
			nonce,
		};

		let signedTransaction = await this.web3.eth.accounts.signTransaction(
			options,
			this.default_account_private_key
		);

		await this.web3.eth
			.sendSignedTransaction(signedTransaction.rawTransaction)
			.on('transactionHash', (transactionHash) => {
				console.log('TX Hash: ' + transactionHash);
			})
			.on('confirmation', (confirmationNumber) => {
				if (confirmationNumber == 1) {
					cb("Transaction Confirmed");
				}
			})
			.on('error', console.error);
	}
}
