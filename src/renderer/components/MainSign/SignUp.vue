<template>
  <v-card dark>
    <v-card-title>
      <h2>Sign Up</h2>
    </v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        
        <v-text-field
          label="Enter your password"
          hint="At least 8 characters"
          v-model="password"
          min="8"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          counter
        ></v-text-field>

        <v-checkbox
          label="Do you agree?"
          v-model="checkbox"
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
          required
        ></v-checkbox>
        <div class="elevation-1 mb-2">
          <v-btn @click="submit" color="primary">submit</v-btn>
          <v-btn @click="clear" color="primary">clear</v-btn>
        </div>
        <div class="elevation-1">
          <v-btn color="primary">Sign In with Google</v-btn>
          <v-btn color="primary">Sign In with Facebook</v-btn>
        </div>
      </form>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
</style>

<script>
import { FirebaseCreateUser } from '../../../firebase/firebaseUtilities.js'
// import swal from 'sweetalert'

export default {
  data: () => ({
    valid: true,
    e1: true,
    password: '',
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /^\w+([\u002E-]?\w+)*@\w+([\u002E-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    checkbox: false
  }),
  methods: {
    /* submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        })
      }
    }, */
    submit () {
      FirebaseCreateUser(this.email, this.password)
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
