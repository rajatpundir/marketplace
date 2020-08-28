import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import AdminBiddingList from '../Components/Section/AdminBiddingList';
import UserBiddingList from '../Components/Section/UserBiddingList';
import Machine from '../Components/Section/Machine';
import MachineList from '../Components/Section/MachineList';
import CreateMachine from '../Components/Section/CreateMachine';
import Contact from '../Components/Section/Contact';

const App = () => (
	<BrowserRouter>
		<Switch>
			<PublicRoute exact path="/" render={(props) => <Dashboard {...props} />} />
			<PublicRoute exact path="/contact/" render={(props) => <Contact {...props} />} />
			<PublicRoute exact path="/biddingList/" render={(props) => <UserBiddingList {...props} />} />
			<PublicRoute exact path="/managebidding/" render={(props) => <AdminBiddingList {...props} />} />
			<PublicRoute exact path="/machine/" render={(props) => <Machine {...props} />} />
			<PublicRoute exact path="/machineList" render={(props) => <MachineList {...props} />} />
			<PublicRoute exact path="/createMachine/" render={(props) => <CreateMachine {...props} />} />
			<PublicRoute exact path="/createMachine/:variableName" render={(props) => <CreateMachine {...props} />} />
			{/* Private Routes */}
		</Switch>
	</BrowserRouter>
);

export default App;
