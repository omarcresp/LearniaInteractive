import Firebase from 'firebase'
import { config } from '../../credentials/secret/firebase'

import swal from 'sweetalert'

const Database = Firebase.initializeApp(config).database()

function FirebaseCreateUser (email, password) {
  Firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    if (error) {
      let errorCode = error.code
      let errorMessage = error.message

      swal(errorCode, errorMessage)
    }
  })
}

function FirebaseLogin (user, pass, role) {
  if (!user) {
    swal('user no defined', '', 'error')
    return
  }
  if (!pass) {
    swal('pass no defined', '', 'error')
    return
  }
  Database.ref('/users/' + user).once('value')
    .catch(function (error) {
      if (error) {
        swal('Usuario no encontrado', '', 'warning')
      }
    })
    .then(snap => {
      if (!snap.exists()) {
        swal('usuario no encontrado', '', 'warning')
        return
      }
      let data = snap.val()
      if (snap.exists && pass === data.pass) {
        Firebase.auth()
          .signInWithEmailAndPassword(data.email, data.pass)
          .catch(function (error) {
            var errorMessage = error.message
            swal(errorMessage, '', 'error')
          })
          .then((user) => {
            if (user) {
              swal('Bienvenido ' + data.name, '', 'success')
              user.role = data.role
            }
          })
      } else {
        swal('findn\'t user or password', '', 'warning')
      }
    })
}

function FirebaseLogOut () {
  Firebase.auth().signOut()
  location.reload()
}

export {
  Firebase,
  Database,
  FirebaseCreateUser,
  FirebaseLogin,
  FirebaseLogOut
}
