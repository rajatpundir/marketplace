import React from 'react';
import styled from 'styled-components';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: 'admin'
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<HeaderContainer>
				<HeaderBackgroundImageContainer>
					<BackgroundImage />
					<NavigationContainer>
						<NavigationInnerContainer>
							<Navholder>
								<LogoContainer>
									<Logo>
										<LogoAnchor>
											<LogoImage src="http://localhost:3000/updatedlogo.png" />
										</LogoAnchor>
									</Logo>
								</LogoContainer>
								<Nav>
									<MenuContainer>
										<Menu>
											<MenuList>
												<MenuListItem>
													<ListItemAnchor>About Jyy</ListItemAnchor>
												</MenuListItem>
												<MenuListItem>
													<ListItemAnchor href="/contact">Contact</ListItemAnchor>
												</MenuListItem>
												<MenuListItem>
													<ListItemAnchor href="/machine">Bidding Items</ListItemAnchor>
												</MenuListItem>
												<MenuListItem>
													<ListItemAnchor>Login</ListItemAnchor>
												</MenuListItem>
											</MenuList>
											{this.state.user==='user'?<MenuList>
												<MenuListItem>
													<ListItemAnchor href="/biddingList">Manage Bidding</ListItemAnchor>
												</MenuListItem>
											</MenuList>:undefined}
											{this.state.user === 'admin' ? (
												<MenuList>
													<MenuListItem>
														<ListItemAnchor href="/machineList">Item List</ListItemAnchor>
													</MenuListItem>
													<MenuListItem>
														<ListItemAnchor href="/managebidding">Manage Bidings</ListItemAnchor>
													</MenuListItem>
													<MenuListItem>
														<ListItemAnchor href="/createMachine">Create New Item</ListItemAnchor>
													</MenuListItem>
												</MenuList>
											) : (
												undefined
											)}
										</Menu>
									</MenuContainer>
								</Nav>
							</Navholder>
						</NavigationInnerContainer>
					</NavigationContainer>
				</HeaderBackgroundImageContainer>
			</HeaderContainer>
		);
	}
}

export default Header;

const HeaderContainer = styled.div`
	position: relative;
	max-height: 300px;
	display: block;
	min-width: 700px;
	@media (max-width: 1200px) {
		flex-direction: column !important;
	}
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;

const HeaderBackgroundImageContainer = styled.div`
	height: 300px;
	overflow: hidden;
	position: relative;
`;
const BackgroundImage = styled.div`
	background-image: url(https://caeonline.com/content/images/marketplace.jpg);
	transform: translateY(0%);
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	background-attachment: scroll;
	background-size: cover;
	background-position: 50% 0%;
	background-repeat: no-repeat;
`;

const NavigationContainer = styled.div`
	position: fixed !important;
	top: 0 !important;
	left: 0 !important;
	right: 0;
	z-index: 499;
	min-width: 700px;
	@media (max-width: 1200px) {
		flex-direction: column !important;
	}
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;
const NavigationInnerContainer = styled.div`
	margin-right: auto;
	margin-left: auto;
	padding-left: 40px;
	padding-right: 40px;
	width: 100%;
`;

const Navholder = styled.div`
	height: 100px;
	position: relative;
	background-color: rgba(0, 0, 0, .85);
	padding: 0 0 40px 227px;
`;

const LogoContainer = styled.div`
	top: 0;
	left: 0;
	width: 228px;
	padding: 25px 0 27px;
	position: absolute;
	border-right: #898989 solid 1px;
	transition: all .35s ease;
	visibility: visible;
	opacity: 1;
	height: inherit;
`;

const Logo = styled.strong`
	width: 125px;
	display: block;
	margin: 0 auto;
	vertical-align: top;
	font-weight: bold;
	height: inherit;
`;
const LogoAnchor = styled.a`
	cursor: pointer;
	color: #003663;
	text-decoration: none;
	background-color: transparent;
	transition: all .35s ease;
`;
const LogoImage = styled.img`
	vertical-align: top;
	width: 100%;
	height: auto;
	max-width: 100%;
	border: 0;
	height: inherit;
`;

const Nav = styled.nav`
	margin: 0;
	background-color: transparent;
	border-color: transparent;
	min-height: 50px;
	// border: 1px solid transparent;
	@media (min-width: 993px) & {
		border-radius: 0;
	}
`;

const MenuContainer = styled.div`
	padding: 0;
	margin-right: auto;
	margin-left: auto;
`;
const Menu = styled.div`
	border-color: transparent;
	margin-right: 0;
	margin-left: 0;
	display: block;
	visibility: visible;
	height: auto;
	padding-bottom: 0;
	overflow: visible;
	width: auto;
	border-top: 0;
	box-shadow: none;
	@media (min-width: 993px) {
	}
`;

const MenuList = styled.ul`
	width: 100%;
	text-align: center;
	display: flex;
	padding-left: 0;
	list-style: none;
`;

const MenuListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	float: none;
	width: inherit;
	border: #898989 solid;
	border-width: 0 1px 1px 0;
	vertical-align: middle;
	height: 50px;
`;
const ListItemAnchor = styled.a.attrs((props) => ({
	BackgroundImage: props.BackgroundImage
}))`
    background:url(${(props) => props.BackgroundImage});
    font-weight: 500;
    display:block;
    position: relative;
    white-space: normal;
    background: url(images/none.gif);
    text-transform: uppercase;
    font-size: 16px;
	line-height: 20px;
	color: #fff;
	transition: all .35s ease;
	outline:none;
    text-decoration: none;`;
