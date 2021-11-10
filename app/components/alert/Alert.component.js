import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const Alert = (props) => {
  const { message, visible } = props.route.params;

  const [show, setShow] = React.useState(visible);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={show}
        onDismiss={() => setShow(false)}
        action={{
          label: 'Close',
          onPress: () => {
            setShow(false);
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Alert;
