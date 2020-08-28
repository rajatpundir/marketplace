import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { clearErrors } from '../../Actions/errors';
import { getVariables, updateBidVariable } from '../../Actions/variable';
import Modal from 'react-modal';
import { successMessage, customErrorMessage } from './Notification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		color: 'rgba(130, 130, 130, 0.5)',
		textAlign: 'center',
		boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
		background: 'none',
		backdropFilter: 'blur(5px)'

		// backgroundColor: 'rgba(255, 255, 255, 0.75)'
	},
	content: {
		width: '50%',
		height: '45%',
		position: 'absolute',
		top: '25%',
		left: '35%',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '10px',
		outline: 'none',
		padding: '20px'
	}
};
class BiddingList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			machine: [],
			isOpen: false,
			expandedRows: [],
			activemachineOnly: false,
			machineStatus: '',
			activeMachine: {}
		};
		this.onChange = this.onChange.bind(this);
		// this.updateBid = this.updateBid.bind(this);
	}

	componentDidMount() {
		this.props.clearErrors();
		this.props.getVariables('Machine');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			machine:
				nextProps.variables !== undefined
					? nextProps.variables.Machine !== undefined
						? nextProps.variables.Machine
								.sort((a, b) => {
									return a.variableName > b.variableName ? 1 : b.variableName > a.variableName ? -1 : 0;
								})
								.map((x, i) => ({ ...x, Id: i }))
						: []
					: []
		};
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	updateMachineStatus(machine) {
		const variable = {
			organization: 'zs',
			typeName: 'Machine',
			variableName: machine.variableName,
			active: this.state.machineStatus,
			values: {}
		};
		console.log(variable);
		this.props.updateBidVariable(variable).then((status) => {
			if (status === 200) {
				this.setState({
					isOpen: false,
					machineStatus: '',
					activeMachine: {}
				});
				successMessage(' Machine Bidding Status  Updated Sucessfully');
			}
		});
	}

	closeModal() {
		this.setState({ isOpen: false });
	}

	renderInputFields() {
		const rows = [];
		const list = this.state.activemachineOnly
			? this.state.machine.filter((machine) => machine.active === true)
			: this.state.machine;
			list.forEach((machine) => {
			rows.push(
				<TableRow onClick={this.handleRowClick} key={machine.variableName}>
					<TableData width="5%">
						<SelectIconContainer>
							<SelectSpan>
								<SelectSpanInner>
									<i
										className="large material-icons"
										onClick={(e) => {
											this.setState({
												activeMachine: machine,
												isOpen: !this.state.isOpen,
												machineStatus: machine.active
											});
										}}
									>
										create
									</i>{' '}
								</SelectSpanInner>
							</SelectSpan>
						</SelectIconContainer>
					</TableData>
					<TableData width="15%">
						<TableHeaderInner>
							<Link to={'/createMachine/' + encodeURIComponent(machine.values.name)}>
								{' '}
								{machine.values.name}
							</Link>
						</TableHeaderInner>
					</TableData>
					<TableData width="15%">
						<TableHeaderInner>{machine.values.model}</TableHeaderInner>
					</TableData>
					<TableData width="15%">
						<TableHeaderInner>{machine.values.category}</TableHeaderInner>
					</TableData>
					<TableData width="15%">
						<TableHeaderInner>{machine.values.manufacturer}</TableHeaderInner>
					</TableData>
					<TableData width="15%">
						<TableHeaderInner>{machine.values.bidPrice}</TableHeaderInner>
					</TableData>
					<TableData width="15%">{machine.active ? 'Active' : 'Disabled'}</TableData>
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
								<LeftItemH1>machine</LeftItemH1>
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
										checked={this.state.activemachineOnly}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activemachineOnly',
													value: !this.state.activemachineOnly
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active machine</CheckBoxLabel>
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
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Machine Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Model</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan textAlign="right">Category</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Manufacurer</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Bid Price</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Open For Bidding</SelectSpan>
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
					onRequestClose={this.closeModal.bind(this)}
					className="boxed-view__box"
					style={customStyles}
					ariaHideApp={false}
					overlayClassName="boxed-view boxed-view--modal"
				>
					<InputFieldContainer>
						<H2 padding="20px" fontSize="revert" fontWeight="400" color="black">
							Update Machine Status
						</H2>
						<FormControl width="45%">
							<SelectWrapper>
								<Select
									value={{
										value: this.state.machineStatus,
										label: this.state.machineStatus ? 'Active' : 'Disabled'
									}}
									onChange={(option) => {
										this.onChange({
											target: { name: 'machineStatus', value: option.value }
										});
									}}
									options={[
										{
											value: true,
											label: 'Active'
										},
										{
											value: false,
											label: 'Disabled'
										}
									]}
								/>
							</SelectWrapper>
							<InputLabel>Status</InputLabel>
						</FormControl>
						<FormControl>
							<Button
								backgroundColor="#5cc150"
								onClick={(e) => {
									this.updateMachineStatus(this.state.activeMachine);
								}}
							>
								Submit
							</Button>
							<Button
								backgroundColor="#f95959"
								marginleft="20px"
								onClick={(e) => {
									this.setState({
										isOpen: false
									});
								}}
							>
								Cancel
							</Button>
						</FormControl>
					</InputFieldContainer>
				</Modal>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables, updateBidVariable })(BiddingList);
const DataOuterContainer = styled.div`width: 100%;`;

const FormControl = styled.div.attrs((props) => ({
	paddingTop: props.paddingTop,
	width: props.width
}))`
	padding-bottom: 20px;
    padding-top:${(props) => props.paddingTop};
    width:${(props) => props.width};
	min-height: 60px;
	position: relative;
	display: flex;
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
const H2 = styled.h2.attrs((props) => ({
	padding: props.padding || 'none',
	color: props.color,
	fontWeight: props.fontWeight || 'bold',
	fontSize: props.fontSize || '1em'
}))`
	padding: ${(props) => props.padding};
	color: ${(props) => props.color};
	font-weight:${(props) => props.fontWeight};
	text-transform: none;
	font-size: ${(props) => props.fontSize};
	letter-spacing: 0;
	line-height: 1.1;
	display: inline;
`;
const Button = styled.button.attrs((props) => ({
	marginleft: props.marginleft,
	backgroundColor: props.backgroundColor
}))`
	height: 40px;
	margin-left:${(props) => props.marginleft};
	background-color:${(props) => props.backgroundColor};
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #151617;
	padding: 10px;
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

const DataContainer = styled.div`
	height: auto;
	max-height: 100vh;
	text-align: left;
	font-size: 13px;
	width: 100%;
	float: left;
	overflow: hidden;
	animation-name: slideDown;
	animation-duration: 0.8s;
	animation-timing-function: ease-in-out;
`;
const TableDiv = styled.div`display: table;`;
const RowContainer = styled.div`display: table-row-group;`;
const Row = styled.div`display: table-row;`;
const LeftItem = styled.div`
	display: table-cell;
	font-weight: bold;
	text-align: left;
	padding: 10px 20px;
	width: 250px;
`;
const RightItem = styled.div`
	display: table-cell;
	text-align: left;
	padding: 10px 20px;
	width: 250px;
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

const PageBlock = styled.div`
	display: block;
	background: #fff;
	width: 100%;
	float: left;
	border-radius: 6px;
	margin-bottom: 20px;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	align-items: center;
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
const SelectWrapper = styled.div`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
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

const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
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

const HiddenTableData = styled.div`
	background: #fafbfd;
	border-bottom: 1px solid #e7e8ec;
	color: #707887;
	width: max-content;
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
const Span = styled.span`
	background-color: #d6f3e3;
	margin-right: 0 !important;
	padding: 4px 10px 4px 10px;
	border-radius: 3px;
	display: inline-block;
	font-weight: 500;
`;

const Anchor = styled.a`
	text-decoration: none;
	color: #05cbbf;
`;

const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;

const PlusButton = styled.button`
	margin-left: 5px;
	color: #04beb3;
	background-color: #05cbbf;
	border-color: #05cbbf;
	width: 32px !important;
	min-width: 32px !important;
	max-width: 32px !important;
	justify-content: center;
	padding: 0 !important;
	height: 32px !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
`;
const CheckBoxWapper = styled.div`
	float: left;
	width: 16px;
`;
const CheckBoxTable = styled.table`
	width: 35% !important;
	table-layout: auto !important;
	border-collapse: inherit !important;
	border-spacing: 0;
`;

const TBody = styled.tbody``;
const TR = styled.tr``;
const TD = styled.td`
	width: 100% !important;
	height: 16px;
	line-height: 1px;
	position: relative;
	font-weight: normal;
	overflow: hidden;
	cursor: pointer;
	vertical-align: top;
	// &:before {
	// 	border-width: 1px;
	// 	border-style: solid;
	// 	border-radius: 4px;
	// 	border-color: #b9bdce;
	// 	content: '';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	-webkit-transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
	// &:after {
	// 	content: '\e81a';
	// 	line-height: 18px;
	// 	font-style: normal;
	// 	color: transparent;
	// 	font-family: 'icons_2019';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
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
