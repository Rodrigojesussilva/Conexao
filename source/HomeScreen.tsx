import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import { DataTable, TextInput, Modal, Portal } from 'react-native-paper';

const HomeScreen = () => {
  const [visible, setVisible] = React.useState({
    addUser: false,
    editUser: false,
    deleteUser: false
  });
  const [currentUser, setCurrentUser] = React.useState<{ username: string; password: string } | null>(null);

  const showModal = (type: 'addUser' | 'editUser' | 'deleteUser') => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type: 'addUser' | 'editUser' | 'deleteUser') => {
    setVisible({ ...visible, [type]: false });
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Button title="Add User" onPress={() => showModal('addUser')} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Username</DataTable.Title>
            <DataTable.Title>Password</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>User1</DataTable.Cell>
            <DataTable.Cell>Pass1</DataTable.Cell>
            <DataTable.Cell>
              <Button
                title="Edit"
                onPress={() => {
                  setCurrentUser({ username: 'User1', password: 'Pass1' });
                  showModal('editUser');
                }}
              />
              <Button title="Delete" onPress={() => showModal('deleteUser')} />
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        {/* Modais */}
        <Portal>
          <Modal visible={visible.addUser} onDismiss={() => hideModal('addUser')} contentContainerStyle={styles.modal}>
            <TextInput label="Username" mode="outlined" />
            <TextInput label="Password" mode="outlined" secureTextEntry />
            <Button title="Save" onPress={() => hideModal('addUser')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.editUser} onDismiss={() => hideModal('editUser')} contentContainerStyle={styles.modal}>
            <TextInput label="Username" mode="outlined" value={currentUser?.username} />
            <TextInput label="Password" mode="outlined" secureTextEntry value={currentUser?.password} />
            <Button title="Save" onPress={() => hideModal('editUser')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.deleteUser} onDismiss={() => hideModal('deleteUser')} contentContainerStyle={styles.modal}>
            <TextInput label="Username" mode="outlined" value={currentUser?.username} disabled />
            <Button title="Confirm Delete" onPress={() => hideModal('deleteUser')} />
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});

export default HomeScreen;

