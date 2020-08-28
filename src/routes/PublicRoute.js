import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Naviagation/Header';
import Footer from '../Components/Naviagation/Footer';
import styled from 'styled-components';

export const PublicRoute = ({ isAuthenticated, render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (
			<MainContainer>
				<Header />
				<Component {...props} />
				<Footer />
			</MainContainer>
		)}
	/>
);

// PublicRoute.prototype = {
// 	isAuthenticated: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
// 	isAuthenticated: !!state.auth.isAuthenticated
// });

export default PublicRoute;

const MainContainer = styled.div`
	display: block;
	background-color: #e3e4e8;
	min-width: 700px;
`;
