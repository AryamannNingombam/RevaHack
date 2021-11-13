import styled from 'styled-components/native';
import { BACKGROUND_COLOR, PRIMARY_FONT } from '../../constants';
export const MainContainer = styled.ScrollView`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 24px 8px;
  padding-bottom: 32px;
`;

export const TopRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const HeaderText = styled.Text`
  margin: 16px;
  margin-bottom: 12px;
  color: #575757;
  font-family: ${PRIMARY_FONT};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  width: 70%;
  text-align: left;
`;

export const RecentReports = styled.ScrollView`
  margin-bottom: 16px;
  padding: 16px;
`;

export const ReportBox = styled.View`
  background: ${BACKGROUND_COLOR};
  border-radius: 30px;
  min-height: 240px;
  margin: 0 16px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Container = styled.View`
  display: flex;
  align-items: flex-start;
`;

export const ReportText = styled.Text`
  margin: 8px 16px;
  margin-top: 12px;
  color: #fff;
  font-family: ${PRIMARY_FONT};
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
`;

export const ImageGrid = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

export const HealthAnalysis = styled.View`
  display: flex;
  flex-direction: row;
  background: rgba(16, 202, 0, 0.13);
  border-radius: 20px;
  width: 90%;
  margin: 16px auto;
  height: 160px;
`;
