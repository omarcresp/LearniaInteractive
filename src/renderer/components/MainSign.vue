<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="selected = 'SignIn'" flat>Sign In</v-btn>
        <v-btn @click="selected = 'SignUp'" flat color="primary">Sign Up</v-btn>
        <v-btn flat>Reset</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex xs10 offset-xs1>
            <component :is="selected"></component>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <v-footer app>
      <v-spacer></v-spacer>
      <span>Learnia (&copy; 2017)</span>
    </v-footer>
  </v-app>
</template>

<style>

</style>

<script>
import SignIn from '@/components/MainSign/SignIn'
import SignUp from '@/components/MainSign/SignUp'

// import Firebase from '../../firebase/firebaseUtilities.js'

export default {
  components: {
    SignIn,
    SignUp
  },
  data: () => ({
    title: 'LearniaInteractive',
    selected: 'SignUp'
  }),
  mounted: function () {
    console.log('test')
  },
  methods: {

  }
}
</script>
