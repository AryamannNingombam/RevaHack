import React from 'react'
import { SafeAreaView, Text } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import IconOg from 'react-native-vector-icons/FontAwesome';
import { DeleteAllReportsForUser } from '../../services/report.service';
import { LeftSide, LeftSideText, MainContainer, RightSide, SettingOptionContainer, SettingOptionSection, SettingsLogoContainer, SettingsLogoHeading } from "./Settings.styles";



export default function SettingsPage(){
    const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
    const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);
    const [isSwitchOn3, setIsSwitchOn3] = React.useState(false);

    const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
    const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);
    const onToggleSwitch3 = () => setIsSwitchOn3(!isSwitchOn3);

    const OnDeleteAllReportsButtonClick = ()=>{
        DeleteAllReportsForUser()
        .then(response=>response.data)
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log('error');
            console.log(err);
        })
    }

    return (
        <SafeAreaView>    
            <MainContainer>
            <SettingsLogoContainer>
            <IconOg color={'#575757'} name={'gear'} size={100}></IconOg>
            <SettingsLogoHeading>SETTINGS</SettingsLogoHeading>
            </SettingsLogoContainer>
            <SettingOptionContainer>
                <SettingOptionSection>
                    <LeftSide><LeftSideText>SETTING 1</LeftSideText></LeftSide>
                    <RightSide>
                        <Switch
                        value={isSwitchOn1} onValueChange={onToggleSwitch1}/>
                    </RightSide>
                </SettingOptionSection>
                <SettingOptionSection>
                <LeftSide><LeftSideText>SETTING 2</LeftSideText></LeftSide>
                    <RightSide>
                    <Switch
                    value={isSwitchOn2} onValueChange={onToggleSwitch2}/>
                    </RightSide>
                </SettingOptionSection>
                <SettingOptionSection>
                <LeftSide><LeftSideText>SETTING 3</LeftSideText></LeftSide>
                    <RightSide>
                    <Switch
                    value={isSwitchOn3} onValueChange={onToggleSwitch3}/>
                    </RightSide>
                </SettingOptionSection>
            </SettingOptionContainer>

            <SettingOptionContainer>
                <Button style={{
                    margin:20
                }} 
                 onPress={OnDeleteAllReportsButtonClick}
                 color="red">Delete All Reports</Button>
                <Button style={{
                    margin:20
                }} color="red">Delete Account</Button>
            </SettingOptionContainer>
        </MainContainer>
        </SafeAreaView>
        
    )
}