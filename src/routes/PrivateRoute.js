// import React from 'react';
// import { connect } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import Navigator from '../components/main/Navigator';

// export const PrivateRoute = ({ isAuthenticated, render: Component, ...rest }) => (
// 	<Route
// 		{...rest}
// 		render={(props) =>
// 			isAuthenticated ? (
// 				<Container>
// 					<Navigator />
// 					<Component {...props} />
// 				</Container>
// 			) : (
// 				<Redirect to="/" />
// 			)}
// 	/>
// );

// PrivateRoute.prototype = {
// 	isAuthenticated: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
// 	isAuthenticated: !!state.auth.isAuthenticated
// });

// export default connect(mapStateToProps)(PrivateRoute);

// // Styled Components

// const Container = styled.div`display: flex;`;
