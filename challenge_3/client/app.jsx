// import ReactDOM from './../public/react-dom.development';
// import React from './../public/react.development.js';


class F1 extends React.Component {

	render() {
		return (
		<div>
			<form onSubmit = {this.props.goToNextForm} id="form1">
				<div>
					<label>Enter your name: </label>
					<input id='name' type='text' name='name'></input>
				</div>
				<br></br>
				<div>
					<label>Enter your e-mail: </label>
					<input type='text' name='e-mail'></input>
				</div>
				<br></br>
				<div>
					<label>Enter your password: </label>
					<input type='text' name='password'></input>
				</div>
				<br></br>
				<div >
					<input type="submit" value="Next"></input>
				</div>                
			</form>
		</div>)
	}
};

class F2 extends React.Component {

	render() {
		return (
		<div>
			<form onSubmit = {this.props.goToNextForm} id="form2">
				<div>
					<label>Enter your address: </label>
					<input type='text' name='line1 address' placeholder='line 1'></input>
					<input type='text' name='line2 address' placeholder='line 2'></input>
				</div>
				<br></br>
				<div>
					<label>Enter your city: </label>
					<input type='text' name='city'></input>
				</div>
				<br></br>
				<div>
					<label>Enter your state: </label>
					<input type='text' name='state'></input>
				</div>
				<br></br>
				<div>
					<label>Enter your zip code: </label>
					<input type='text' name='zip code'></input>
				</div>
				<br></br>
				<div >
					<input type="submit" value="Next"></input>
				</div>                
			</form>
		</div>)
	}
};

class F3 extends React.Component {

	render() {
		return (
		<div>
			<form onSubmit = {this.props.goToNextForm} id="form3">
				<div>
					<label>Enter your Credit Card Number: </label>
					<input type='text' name='credit card #' ></input>
				</div>
				<br></br>
				<div>
					<label>Enter the expiration date: </label>
					<input type='text' name='exp date'></input>
				</div>
				<br></br>
				<div>
					<label>Enter the CVV: </label>
					<input type='text' name='cvv'></input>
				</div>
				<br></br>
				<div>
					<label>Enter your billing zip code: </label>
					<input type='text' name='billing zip code'></input>
				</div>
				<br></br>
				<div >
					<input type="submit" value="Next"></input>
				</div>                
			</form>
		</div>)
	}
};

class ConfirmationItem extends React.Component {

	constructor(props) {
		super(props)
	}

	render () {
		return (
			<li>{this.props.info[0] + ': ' + this.props.info[1]}</li>
		)
	}
}

class PurchaseButton extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <button onClick = {(e) => {this.props.goToNextForm(e)}}>Purchase</button>
	}
}


class ConfirmationList extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render () {
		return (
			<div>
				<ul>
					{this.props.infos.map((info, ind) =>
					<ConfirmationItem key = {ind} info={info} />
					)}
    			</ul>
				<PurchaseButton goToNextForm = {this.props.goToNextForm} />
			</div>
		)
		
	}
}


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			step1: true,
			step2: false,
			step3: false,
			step4: false
		};

		this.goToNextForm = this.goToNextForm.bind(this);

		this.infos = [];

	}

	goToNextForm(e) {

		e.preventDefault()

		if (this.state.step1 === true) {

			this.infos = [];

			var form = document.getElementById('form1').elements 

			var jsonForm1 = {};

			for (let i = 0; i < form.length -1 ; i++) {
				jsonForm1[form[i].name] = form[i].value
			}
			
			this.setState({
				step1: false,
				step2: true
			});

			axios.post(`/f1`, jsonForm1)

		} else if (this.state.step2 === true) {

			var form = document.getElementById('form2').elements 

			var jsonForm2 = {};

			jsonForm2.address = form[0].value + ' ' + form[1].value;
			for (let i = 2; i < form.length - 1 ; i++) {
				jsonForm2[form[i].name] = form[i].value
			}
			
			this.setState({
				step2: false,
				step3: true
			});

			axios.post(`/f2`, jsonForm2)

		} else if (this.state.step3) {
			var form = document.getElementById('form3').elements 

			var jsonForm3 = {};

			for (let i = 0; i < form.length - 1 ; i++) {
				jsonForm3[form[i].name] = form[i].value
				
			}
			axios.post('/f3', jsonForm3 )
			.then(() => {
				axios.get('/confirmation')
				.then((result) => {

					var infos = result.data[0];
					for (var key in infos) {
						if (key === 'C_PASSWORD' || key === 'ID') {
							continue;
						} else {
							if (key === 'C_NAME') {
								this.infos.push(['Name', infos[key]]);
							} else if ( key === 'C_EMAIL') {
								this.infos.push(['E-Mail', infos[key]]);
							} else if ( key === 'C_ADDRESS') {
								this.infos.push(['Address', infos[key]]);
							} else if ( key === 'C_CITY') {
								this.infos.push(['City', infos[key]]);
							} else if ( key === 'C_STATE') {
								this.infos.push(['State', infos[key]]);
							} else if ( key === 'C_ZIPCODE') {
								this.infos.push(['Zip Code', infos[key]]);
							} else if ( key === 'C_CREDITCARD') {
								this.infos.push(['Credit Card Number', infos[key]]);
							} else if ( key === 'C_EXPIRY_DATE') {
								this.infos.push(['Expiration Date', infos[key]]);
							} else if ( key === 'C_CVV') {
								this.infos.push(['CVV', infos[key]]);
							} else if ( key === 'C_BILLINGZIP') {
								this.infos.push(['Billing Zip Code', infos[key]]);
							} 
						}
					}

					this.setState({
						step3: false,
						step4: true
					})
				})
			})			
		} else {
			this.setState({
				step1: true,
				step4: false
			})
		}			
	}

	render() {
		return (
			<div>
				{this.state.step1 ? <F1 goToNextForm = {this.goToNextForm}/> : null}
				{this.state.step2 ? <F2 goToNextForm = {this.goToNextForm}/> : null}
				{this.state.step3 ? <F3 goToNextForm = {this.goToNextForm}/> : null}
				{this.state.step4 ? <ConfirmationList infos = {this.infos} goToNextForm = {this.goToNextForm}/>: null}
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));




