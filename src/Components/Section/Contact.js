import React from 'react';
import styled from 'styled-components';

class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
					<Section>
				<MainContainer>
					<MainSection>
						<Article>
							<ArticleInner>
                                <IframeContaienr>
                                <iframe
									title="address"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.9330656154902!2d77.41952441406946!3d28.511661482465676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce93cfdbc203d%3A0x12d669e40c2142c!2sJYY%20Automation%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1597394923556!5m2!1sen!2sin"
									width="100%"
									height="450"
									frameBorder="0"
									aria-hidden="false"
								/>
                                </IframeContaienr>
								
								<ArticleText>JYY AUTOMATION TECHNOLOGY CO.LTD</ArticleText>
								<ArticleText>
									Address：Plot No.18, Sector-140A,Noida, Gautam Budh Nagar.201304(U.P)
								</ArticleText>
								<ArticleText>
									<ArticleLink href="tel:0120-6251878	" >
										Tel：0120-6251878{' '}
									</ArticleLink>
								</ArticleText>
								<ArticleText>Website：http://www.jyyautomation.com</ArticleText>
								<ArticleText>
									<ArticleLink href="mailto:yash.arya@jyyautomation.com" target="_blank">
										E-mail：yash.arya@jyyautomation.com
									</ArticleLink>
									<ArticleLink href="mailto:sales@jyyautomation.com" target="_blank" marginLeft="5px">
										| sales@jyyautomation.com
									</ArticleLink>
								</ArticleText>

								<ArticleText>
									<ArticleLink
										href="https://www.facebook.com/JYY-Automation-Technologies-Pvt-Ltd-114619426995026"
										target="_blank"
									>
										<img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" />
									</ArticleLink>
									<ArticleLink
										href="https://www.linkedin.com/company/jyy-automation-technologies-pvt-ltd/?viewAsMember=true"
										target="_blank"
									>
										<img
											src="https://img.icons8.com/fluent/48/000000/linkedin.png"
											alt="Linkedin"
										/>{' '}
									</ArticleLink>
									<ArticleLink>
										<img
											src="https://img.icons8.com/color/48/000000/youtube-play.png"
											alt="Youtube"
										/>
									</ArticleLink>
								</ArticleText>
							</ArticleInner>
						</Article>
					</MainSection>
				</MainContainer>
			</Section>
			</Container>
		);
	}
}



export default Contact;






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
const PageWrapper = styled.div`
	 flex: 1;
    overflow: hidde
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1201px) {
		margin: 20px 20px 0 20px;
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
const Section = styled.div`
	width: 100%;
    position: relative;
    background: white;

`;

//--------------- MAIN CONTAINER----------------//
const MainContainer = styled.div`display: block; width:inherit;`;
const MainSection = styled.div`
	width: 100%;
	position: relative;
`;


const Article = styled.div`
	text-align: justify;
	word-wrap: break-word;
	clear: both;
	overflow: hidden;
	display: block;
`;

const ArticleInner = styled.div`padding: 65px;`;


const ArticleText = styled.p`
	font-size: 16px;
	color: black;
	line-height: 24px;
	padding: 0px;
	padding-left: 65px;
	margin: 10px;
`;
const ArticleLink = styled.a.attrs((props) => ({
	marginLeft: props.marginLeft
}))`
	font-size: 16px;
	color: black;
	line-height: 24px;
	padding: 0px;
	margin: 0px;
	margin-left:${(props) => props.marginLeft};
	text-decoration: none;
`;

const IframeContaienr=styled.div`
display:block;
margin:0 auto;
border: 1px solid #b9bdce;

`