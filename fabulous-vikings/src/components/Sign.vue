<template>
  <div class="sign-body">
    <header class="sign-header">
      <figure class="sign-icon">
        <img class="letter-a" src="../assets/graphics/a.svg" />
      </figure>
      <h1 class="sign-title">Välkommen till Airbean-familjen!</h1>
      <p class="sign-bread">
        Genom att skapa ett konto nedan kan du spara och se din orderhistorik
      </p>
    </header>
    <main class="sign-main">
      <label class="sign-label"> Namn </label>
      <input type="text" v-model="UserName" class="sign-input" placeholder="This Guy!" />
      <label class="sign-label"> Epost </label>
      <input type="text" v-model="UserEmail" class="sign-input" placeholder="This Email!" />
      <label class="gdpr">
        <input type="checkbox" id="checkbox" v-model="gdprOk" class="gdpr-checkmark" />
        <p class="gdpr-bread">GPDPR Ok!</p>
      </label>
    </main>
    <footer class="sign-footer">
      <button v-on:click="validation" class="confirm-sign">Brew me a cup!</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserName: '',
      UserEmail: '',
      gdprOk: false
    }
  },
  methods: {
    validation() {
      if (this.UserName.length > 0 && this.UserEmail.includes('@') == true && this.gdprOk == true) {
        let obj = {
          userName: this.UserName,
          userEmail: this.UserEmail,
          gpdr: this.gdprOk
        }

        return console.log('valid', obj)
      } else {
        return console.log('not valid')
      }
    }
  }
}
</script>

<style>
.sign-body {
  position: fixed;
  max-width: 90%;
  height: 80%;
  background-color: var(--bean-pink);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sign-header {
  height: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sign-icon {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 30px 0px -30px 0px;
}

.letter-a {
  width: 50%;
}

.sign-title {
  margin: 0px;
  margin-top: 30px;
  width: 90%;
}

.sign-bread {
  margin: 10px 0px 0px 0px;
  max-width: 90%;
}

.sign-main {
  height: 35%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sign-label {
  align-self: flex-start;
  margin-bottom: 5px;
}

.sign-input {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  background: none;
  box-shadow: none;
  border: solid black 1px;
  border-radius: 6px 6px 6px 6px;
}

input[type='text'] {
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;
}

.gdpr {
  display: flex;
  flex-direction: row;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  margin-left: 5px;
}

.gdpr input {
  appearance: none;
}

.gdpr-checkmark {
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: none;
  border: 1px solid black;
  border-radius: 50%;
  margin: 0px;
  cursor: pointer;
}

.gdpr-checkmark:checked {
  background-color: #0e927d;
}

.gdpr-bread {
  margin: 0px 0px 0px 5px;
}
.sign-footer {
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.confirm-sign {
  border: none;
  width: 250px;
  height: 60px;
  background-color: var(--bean-black);
  border-radius: 30px 30px 30px 30px;
  color: white;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
}
</style>
