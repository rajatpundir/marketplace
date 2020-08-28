import React from 'react';
import styled from 'styled-components';
import LocationOnIcon from '@material-ui/icons/LocationOn';

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<FooterContainer>
				<FooterSection>
					<InfoContainer>
						<Address>
							<Anchor href="https://goo.gl/maps/etJukhmHjmsF7wzn9" target="_blank">
								<IconContainer>
									<LocationOnIcon fontSize="large" />
								</IconContainer>
								<Span >Plot No.18, Sector-140A,Noida</Span>
								<Span>Gautam Budh Nagar,201304(U.P) </Span>
							</Anchor>
						</Address>
					</InfoContainer>
				</FooterSection>
			</FooterContainer>
		);
	}
}

export default Footer;

const FooterContainer = styled.div`
	padding: 0;
	width: 100%;
	min-width: 700px;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	padding: 0 40px;

	@media (max-width: 1200px) {
		flex-direction: column !important;
	}
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;

const FooterSection = styled.div`
	padding: 30px 10px 20px;
	background: #000;
    min-height: 150px;
    width:100%;
`;

const InfoContainer = styled.aside`
color: #fff;
    margin: 0 auto;
    max-width: 1048px;
    padding: 0 0 50px;
}
`;
const Address = styled.address`
    float: none;
    width: 270px;
	font-weight: 600;
	position: relative;
	padding: 0 0 0 27px;
	letter-spacing: 1px;
	text-transform: uppercase;
	font-size: .66667em;
	line-height: 1.98833;
	margin: 0 0 10px 18px;
`;
const Anchor = styled.a`
	color: #fff;
	text-decoration: none;
	cursor: pointer;
`;
const IconContainer = styled.span`
	top: -5px;
	left: -6px;
	font-size: 26px;
	position: absolute;
	color: white;
`;
const Span =styled.span`
display:block;
color: #fff;
font-size:12px;
`