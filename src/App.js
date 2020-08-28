import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AdminBiddingList from './Components/Section/AdminBiddingList'
import UserBiddingList from './Components/Section/UserBiddingList'
import Machine from './Components/Section/Machine'
import MachineList from './Components/Section/MachineList'
import CreateMachine from './Components/Section/CreateMachine'

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" render={(props) => <Dashboard {...props} />} />
			<Route exact path="/biddingList/" render={(props) => <UserBiddingList {...props}/>} />
			<Route exact path="/adminBiddingList/" render={(props) => <AdminBiddingList {...props}/>} />
			<Route exact path="/machine/" render={(props) => <Machine {...props}/>} />
			<Route exact path="/machineList" render={(props) => <MachineList {...props}/>} />
			<Route exact path="/createMachine/" render={(props) => <CreateMachine {...props}/>} />
			<Route exact path="/createMachine/:variableName" render={(props) => <CreateMachine {...props}/>} />

			{/* Private Routes */}
		</Switch>
	</BrowserRouter>
);

export default App;
