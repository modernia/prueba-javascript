import firebase from './firebase'

export default async function uploadImage(file, filename, type) {



  const storageRef = await firebase.storage().ref(`${type}/${filename}`)

  const upload = await storageRef.put(file);

  // Supervisar el proceso
  return upload


}

