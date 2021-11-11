import styled from 'styled-components/native'
import {PRIMARY_FONT, SECONDARY_FONT} from '../../constants'

export const MainContainer = styled.View`
width:100%;
height:100%;
background-color:#F5F5F5;
display:flex;
justify-content:center;
align-items:center;
`
export const SettingsLogoContainer = styled.View`
width:100%;
height:30%;
display:flex;
justify-content:center;
align-items:center;
`
export const SettingsLogoHeading = styled.Text`
margin-top:15;
font-size:40;
font-family:${PRIMARY_FONT}
color:#575757;
`

export const SettingOptionContainer = styled.View`
display:flex;
width:90%;
flex-direction:column;
justify-content:center;
align-items:center;
`
export const SettingOptionSection = styled.View`
display:flex;
width:100%;
flex-direction:row;
justify-content:center;
align-items:center;
height:10%;
margin:10px 0;
` 


export const LeftSide = styled.View`
flex:1;
display:flex;
align-items:center;
justify-content:center;
height:100%;

`
export const LeftSideText = styled.Text`
color:#575757;
font-size:20;
font-family:${PRIMARY_FONT}
`

export const RightSide = styled.View`
flex:1;
height:100%;
display:flex;
align-items:center;
justify-content:center;
`

