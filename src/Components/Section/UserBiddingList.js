import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { clearErrors } from '../../Actions/errors';
import { getVariables, updateBidVariable } from '../../Actions/variable';
import Modal from 'react-modal';
import { successMessage, customErrorMessage } from './Notification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@material-ui/icons/Edit';

const customStyles = {
	overlay: {
		zIndex: 1040,
		display: 'block',
		overflowX: 'hidden',
		overflowY: 'auto',
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100% ',
		outline: 0,
		margin: '0 !important',
		backgroundColor: '#12121275 '
	},
	content: {
		position: 'relative',
		padding: 0,
		maxWidth: '420px',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		backgroundColor: '#fff',
		margin: '1.75rem auto',
		backgroundClip: 'padding-box',
		border: '1px solid rgba(0,0,0,0.2)',
		borderRadius: '10px',
		boxShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.2)',
		outline: 0
	}
};

class UserBiddingList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bids: [],
			isOpen: false,
			expandedRows: [],
			activebidsOnly: false,
			price: 0,
			quantity: 0,
			activebid: {}
		};
		this.onChange = this.onChange.bind(this);
		this.updateBid = this.updateBid.bind(this);
	}

	componentDidMount() {
		this.props.clearErrors();
		this.props.getVariables('BiddingList');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const user = 'shubham3480';
		return {
			...prevState,
			bids:
				nextProps.variables !== undefined
					? nextProps.variables.BiddingList !== undefined
						? nextProps.variables.BiddingList
								.sort((a, b) => {
									return a.variableName > b.variableName ? 1 : b.variableName > a.variableName ? -1 : 0;
								})
								.map((x, i) => ({ ...x, Id: i }))
								.filter((bid) => bid.values.user === user)
						: []
					: []
		};
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	updateBid(bid) {
		const variable = {
			organization: 'zs',
			typeName: 'BiddingList',
			variableName: bid.variableName,
			values: {
				price: this.state.price,
				quantity: this.state.quantity
			}
		};
		if (this.state.price > 0 && this.state.quantity >= 1) {
			this.props.updateBidVariable(variable).then((status) => {
				if (status === 200) {
					this.setState({
						isOpen: false,
						price: 0,
						quantity: 1,
						activebid: {}
					});
					successMessage('Bid Updated Sucessfully');
				}
			});
		} else {
			const errorMessage = ' Price to low  \n  Quantity cannot be less than 1';
			customErrorMessage(errorMessage);
		}
	}

	closeModal() {
		this.setState({ isOpen: false });
	}

	renderInputFields() {
		const rows = [];
		const list = this.state.activebidsOnly
			? this.state.bids.filter((bids) => bids.values.status === 'Pending')
			: this.state.bids;
		list.forEach((bids) => {
			rows.push(
				<TableRow onClick={this.handleRowClick} key={bids.variableName}>
					<TableData width="5%">
						<SelectIconContainer>
							<SelectSpan>
								<SelectSpanInner>
									{/* onClick={(e) => {
										 	this.setState({
										         activebid:bids,
									 		isOpen: !this.state.isOpen,
												price: bids.values.price,
												quantity: bids.values.quantity
										 	});
										 }} */}
									{bids.values.status === 'Pending' ? <EditIcon /> : undefined}
								</SelectSpanInner>
							</SelectSpan>
						</SelectIconContainer>
					</TableData>
					<TableData width="25%">
						<TableHeaderInner>{bids.values.machine}</TableHeaderInner>
					</TableData>
					<TableData width="25%">
						<TableHeaderInner>{bids.values.quantity}</TableHeaderInner>
					</TableData>
					<TableData width="25%">
						<TableHeaderInner>{bids.values.price}</TableHeaderInner>
					</TableData>
					<TableData width="25%">
						<TableHeaderInner>{bids.values.status}</TableHeaderInner>
					</TableData>
				</TableRow>
			);
		});

		return rows;
	}

	render() {
		return (
			<Container>
				<StyledContainer limit={2} />
				<PageWrapper>
					<PageBody>
						<PageToolbar>
							<ToolbarLeftItems>
								<LeftItemH1>Bids</LeftItemH1>
							</ToolbarLeftItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important">
							<PageBarAlign padding="10px 20px" float="left">
								<LeftItemFormControl paddingBottom="0">
									<Input
										width="250px"
										height="32px"
										padding="0 10px"
										placeholder="Type text to search"
									/>
								</LeftItemFormControl>
								<LeftItemFormControl paddingBottom="0">
									<ButtonWithOutline>Search</ButtonWithOutline>
								</LeftItemFormControl>
							</PageBarAlign>
							<PageBarAlign padding="10px 20px" float="left">
								<CheckBoxContainer>
									<CheckBoxInput
										type="checkbox"
										checked={this.state.activebidsOnly}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activebidsOnly',
													value: !this.state.activebidsOnly
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active bids</CheckBoxLabel>
								</CheckBoxContainer>
							</PageBarAlign>
						</PageToolbar>
						<InputBody borderTop="0" padding="0">
							<RoundedBlock border="none">
								<TableFieldContainer>
									<HeaderBodyContainer>
										<HeaderBody>
											<BodyTable>
												<TableBody>
													<TableRow>
														<TableHeaders width="8%">
															<SelectIconContainer>
																<SelectSpan>Edit</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="25%">
															<SelectIconContainer>
																<SelectSpan>Machine Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="25%">
															<SelectIconContainer>
																<SelectSpan>Quantity</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="25%">
															<SelectIconContainer>
																<SelectSpan textAlign="right">Price</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="25%">
															<SelectIconContainer>
																<SelectSpan>Status</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>
													{this.renderInputFields()}
												</TableBody>
											</BodyTable>
										</HeaderBody>
									</HeaderBodyContainer>
								</TableFieldContainer>
							</RoundedBlock>
						</InputBody>
					</PageBody>
				</PageWrapper>
				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Place Bid"
					onAfterOpen={() => this.refs.price.focus()}
					onRequestClose={this.closeModal.bind(this)}
					className="boxed-view__box"
					style={customStyles}
					ariaHideApp={false}
					overlayClassName="boxed-view boxed-view--modal"
				>
					<ModalHeader>
						<ModalTitle> Enter Bid Details</ModalTitle>
						<ModalHeaderCloseButton
							onClick={(e) => {
								this.setState({
									isOpen: false
								});
							}}
						>
							<span>X</span>
						</ModalHeaderCloseButton>
					</ModalHeader>{' '}
					<ModalBody>
						<InputFieldContainer>
							<FormControl>
								<Input
									name="price"
									type="decimal"
									ref="price"
									placeholder="Price"
									value={this.state.price}
									onChange={this.onChange}
								/>
								<InputLabel>Price</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="quantity"
									type="number"
									placeholder="Quantity"
									value={this.state.quantity}
									onChange={this.onChange}
								/>
								<InputLabel>Quantity</InputLabel>
							</FormControl>
						</InputFieldContainer>
					</ModalBody>
					<ModalFooter>
						<ModalSubmitButton
							onClick={(e) => {
								this.updateBid(this.state.activebid);
							}}
						>
							Save
						</ModalSubmitButton>
						<ModalCloseButton
							onClick={(e) => {
								this.setState({
									isOpen: false
								});
							}}
						>
							Cancel
						</ModalCloseButton>
					</ModalFooter>
				</Modal>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables, updateBidVariable })(UserBiddingList);

const FormControl = styled.div.attrs((props) => ({
	paddingTop: props.paddingTop
}))`
	padding-bottom: 20px;
	padding-top:${(props) => props.paddingTop};
	min-height: 60px;
	position: relative;
	display: flex;
	width:100%;
	align-items: center;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
}
`;

const InputLabel = styled.label`
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	position: absolute;
	top: -6px;
	left: 7px;
	padding: 0 3px;
	background-color: #fff;
	white-space: nowrap;
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	&:before {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;


const InputFieldContainer = styled.div`
	height: -webkit-fill-available;
	width: -webkit-fill-available;
	display: flex;
	flex-direction: column;
	align-items: center;
	display: -ms-flexbox;
	justify-content: space-evenly;
	flex-wrap: wrap;
	width: 100%;
`;
// styling Toast container
const StyledContainer = styled(ToastContainer).attrs(
	{
		// custom props
	}
)`
	.Toastify__toast-container {}
	.Toastify__toast {}
	.Toastify__toast--error {
		margin: 0 0 6px;
		padding: 10px 15px;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		background-repeat: no-repeat;
		background-color: #fd4a4a;
	}
	.Toastify__toast--success {
		margin: 0 0 6px;
		padding: 16px 42px 16px 55px;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		background-repeat: no-repeat;
		background-color: rgb(7, 188, 12);
	}
	.Toastify__toast-body {
		white-space: pre-line;
	}
	.Toastify__progress-bar {}
  `;



//different Style
const Container = styled.div`
	padding: 0;
	width: 100%;
	min-width: 700px;
	margin: 1px 0px;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	padding: 0 40px;
	@media (max-width: 1200px) {
		flex-direction: column !important;
	}
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;
// padding: 20px 20px 0 20px !important;

const PageToolbar = styled.div.attrs((props) => ({
	padding: props.padding || '16px 20px'
}))`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
    padding: ${(props) => props.padding};
    align-items: center;
    border-bottom: 1px solid #e0e1e7;

`;

const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;
const LeftItemH1 = styled.h1`
	font-size: 16px;
	text-transform: uppercase;
	font-weight: bolder;
	padding-right: 20px;
	display: flex;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;

const LeftItemFormControl = styled.div`
	position: relative;
	display: flex;
	align-items: start;
`;

//can be used for both left and right
const PageBarAlign = styled.div.attrs((props) => ({
	padding: props.padding || '0',
	float: props.float
}))`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: ${(props) => props.float};
    padding: ${(props) => props.padding};
`;

// const PageBarAlignRight = styled.div`
// 	display: flex;
// 	justify-content: flex-end !important;
// 	align-items: center;
// 	float: right;
// `;

const ButtonWithOutline = styled.button`
	background-color: transparent !important;
	color: #05cbbf;
	border-color: #05cbbf;
	margin-left: 5px;
	min-width: 70px;
	padding: 0 10px;
	height: 32px !important;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	align-self: center;
	white-space: nowrap;
	border-radius: 4px;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
`;

const PageWrapper = styled.div`
	flex: 1;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	background: white;
	min-height: 500px;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 1201px) {
		width: 75%;
	}
`;

const PageBody = styled.div`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;



const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7',
	padding: props.padding || '20px 20px 0 20px'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	overflow: hidden;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: ${(props) => props.padding};
`;

const Input = styled.input.attrs((props) => ({
	width: props.width || 'inherit',
	height: props.height || '40px',
	padding: props.padding || '11px 10px 10px 10px'
}))`
	width: ${(props) => props.width};
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: ${(props) => props.padding};
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	flex: 1;

	min-height: ${(props) => props.height};
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;


const RoundedBlock = styled.div.attrs((props) => ({
	marginTop: props.marginTop || '0',
	border: props.border || '1px solid #b9bdce'
}))`
	border: ${(props) => props.border};
	border-radius: 4px;
	width: 100%;
	float: left;
	overflow: hidden;
	margin-top:${(props) => props.marginTop};
`;

// float: left;
const TableFieldContainer = styled.div`
	position: relative;
	width: 100% !important;
	overflow: hidden;

	min-height: auto !important;
	text-align: center;
	top: 0 !important;
	height: inherit !important;
`;

const SelectIconContainer = styled.div`
	justify-content: center;
	padding: 0 10px !important;

	font-weight: bold;
	font-size: 11px;
	text-transform: uppercase;
	height: 100% !important;
	display: flex;
	align-self: stretch;
	width: 100%;
`;
const SelectSpan = styled.span.attrs((props) => ({
	textAlign: props.textAlign || 'left'
}))`
	display: flex;
	align-items: center;
	overflow: hidden;
	text-align: ${(props) => props.textAlign};
	cursor: pointer;
`;
const SelectSpanInner = styled.span`white-space: nowrap;`;

const HeaderBodyContainer = styled.div`
	width: 100%;
	height: inherit !important;
	float: left;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;
const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 100%;
`;
const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: #f0f3fa;
	}
`;

const TableHeaders = styled.th.attrs((props) => ({
	width: props.width,
	left: props.left || '0'
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
	&:hover{
		border-right: 1px solid #e0e1e7;
		border-left: 1px solid #e0e1e7;
		background-color:none;

	}
`;



const TableData = styled.td`
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
`;

const TableHeaderInner = styled.div`
	width: 100%;
	padding: 0 3px;
	color: #41454e;
	vertical-align: middle;
	font-size: 13px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
`;






const CheckBoxInput = styled.input`
	width: 16px;
	height: 16px;
	padding: 0;
	-webkit-appearance: button;
	cursor: pointer;
	font-size: 100%;
	outline: none;
	vertical-align: baseline;
	line-height: normal;
	color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
	background-color: -internal-light-dark-color(rgb(239, 239, 239), rgb(74, 74, 74));
	border-width: 2px;
	border-style: outset;
	border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
	border-image: initial;
	user-select: none;
	white-space: pre;
	align-items: flex-start;
	text-align: center;
`;

const CheckBoxLabel = styled.label`padding-left: 5px;`;
const CheckBoxContainer = styled.div`
	margin: 5px 0px;
	align-items: center;
	margin-right: 10px !important;
	position: relative;
	display: flex;
`;

const ModalHeader = styled.div`
	display: flex;
	-ms-flex-align: start;
	align-items: flex-start;
	-ms-flex-pack: justify;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 18px 20px 18px 20px;
	height: 63px;
	border-bottom: 1px solid #e0e1e7;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const ModalTitle = styled.h4`
	margin-bottom: 0;
	color: #3b3b3b;
	line-height: 16px;
	font-weight: bold;
	font-size: 18px;
`;

const ModalHeaderCloseButton = styled.button`
	padding: 0;
	opacity: 0.75;
	font-weight: 300;
	font-size: 1.8rem;
	background-color: transparent;
	border: 0;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	-webkit-transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const ModalFooter = styled.div`
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	justify-content: flex-end;
	padding: 0 20px 20px 20px;
	width: 100%;
`;
const ModalSubmitButton = styled.button`
	margin-right: 8px;
	min-width: 70px;
	background-color: #05cbbf;
	border-color: #05cbbf;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;

	&:active {
		background-color: #00afa5 !important;
		border-color: #00afa5 !important;
	}
	&:hover {
		outline: none;
		background-color: #04beb3;
		border-color: #04beb3;
		color: #fff;
	}
	&:focus {
		background-color: #04beb3;
		border-color: #04beb3;
		color: #fff;
		outline: none;
	}
`;

const ModalCloseButton = styled.button`
	min-width: 70px;
	border-color: #b9bdce;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background: transparent;
	color: #3b3b3b;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	outline: none;
`;

const ModalBody = styled.div`
	width: 100%;
	position: relative;
	flex-direction: column;
	display: flex;
	padding: 20px;
	font-size: 13px;
	color: #3b3b3b;
`;
