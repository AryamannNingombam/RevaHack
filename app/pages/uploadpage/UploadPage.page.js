import React, { useEffect } from 'react';
import { SafeArea } from '../../components/utility/safe-area.component';
import { StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_FONT } from '../../constants';
import { MainContainer } from '../profile/Profile.styles';
import {
  DeleteBtn,
  FormView,
  HeaderText,
  Label,
  UploadButtonContainer,
  UploadContainer,
} from './UploadPage.styles';

import * as DocumentPicker from 'expo-document-picker';
import { Colors, Button, ActivityIndicator, IconButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddReport } from '../../services/report.service';
import { SaveButtonSection } from '../editprofile/editprofile.styles';
import { UploadedPicture } from '../uploadreview/UploadReview.styles';
import { VerticalCenter } from '../viewreport/ViewReport.styles';

const styles = StyleSheet.create({
  input: {
    height: 48,
    margin: 12,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFF',
    color: '#1d1d1d',
  },
});

export default function UploadPage() {
  const [text, onChangeText] = React.useState('');
  const [report, setReport] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);

  useEffect(() => {
    setReport(null);
    onChangeText('');
  }, []);

  const uploadReport = async () => {
    setUploading(true);
    if (report.uri) {
      let formdata = new FormData();
      formdata.append('file', {
        uri: report.uri,
        name: report.name,
        type: report.mimeType,
      });

      formdata.append('name', text);
      await AddReport(formdata);

      setUploading(false);
    }
  };
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });
    setReport(result);
  };
  return (
    <SafeArea>
      {uploading ? (
        <>
          <VerticalCenter>
            <ActivityIndicator animating={true} color={Colors.black} size={40} />
            <HeaderText style={{ textAlign: 'center', color: '#000' }}>Uploading Report</HeaderText>
          </VerticalCenter>
        </>
      ) : (
        <MainContainer>
          <HeaderText>Upload Your Report</HeaderText>
          <FormView style={{ marginTop: 32 }}>
            <Label>Name of the Report</Label>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter name of the Report"
            />
          </FormView>
          {report && report.uri ? (
            <FormView style={{ marginTop: 32 }}>
              <Label style={{ marginBottom: 20 }}>Chosen Report</Label>
              <UploadedPicture source={{ uri: report ? report.uri : '' }} />
              <DeleteBtn>
                <IconButton
                  icon="cancel"
                  color={'red'}
                  onPress={() => {
                    setReport({});
                  }}
                />
              </DeleteBtn>
            </FormView>
          ) : (
            <FormView style={{ marginTop: 32 }}>
              <Label>Select your report to save</Label>
              <TouchableOpacity onPress={_pickDocument}>
                <UploadContainer>
                  <Icon name={'plus'} size={60} color={Colors.grey400}></Icon>
                </UploadContainer>
              </TouchableOpacity>
            </FormView>
          )}

          <UploadButtonContainer>
            <SaveButtonSection>
              <Button
                disabled={!text && report?.uri}
                onPress={uploadReport}
                style={{
                  borderRadius: 30,
                  backgroundColor: text && report?.uri ? 'black' : 'darkgray',
                  color: 'white',
                  fontFamily: `${PRIMARY_FONT}`,
                }}
                mode="contained"
              >
                UPLOAD
              </Button>
            </SaveButtonSection>
          </UploadButtonContainer>
        </MainContainer>
      )}
    </SafeArea>
  );
}
