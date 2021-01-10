import { mapState } from 'vuex';
<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="choice.min"
                  label="Min*"
                  type="number"
                  hint="Valeur minimun"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                v-model="choice.max"
                  type="number"
                  label="Max*"
                  hint="Valeur maximun"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="choice.step"
                  label="Step*"
                  type="number"
                  hint="Le pas"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="choice.inputType"
                  :items="availableGenerators"
                  label="Liste des generateur disponible"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*elements obligatoire</small>
         <p class="red--text">{{ errorMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal"> Fermer </v-btn>
          <v-btn color="blue darken-1" text @click="prepareExec"> Lancer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Modal",
  data: ()=>({
    choice:{
      max:null,
      min:null,
      step:null,
      inputType:null
    },
    errorMessage:""
  }),
  computed: {
    ...mapState("modalStore", ["isOpen"]),
    ...mapState("communStore", ["availableGenerators"]),
  },
  methods: {
    ...mapActions("modalStore", ["closeModal"]),
    ...mapActions("communStore", ["startExec"]),
    prepareExec() {
      for(const [key,value] of Object.entries(this.choice)){
        if(value===null) return this.errorMessage="Tous les champs doivent etre remplie";
        if(!isNaN(parseInt(value))){
          this.choice[key]=parseInt(value);
        }
      } 

      if(this.choice.max<this.choice.min){
        return this.errorMessage="Le maximun doit etre supérieur ou minimun"
      }
      if(((this.choice.max-this.choice.min)%this.choice.step)!==0){
        return this.errorMessage="Les step choici est impossible"
      }
      this.startExec(this.choice)
      this.closeModal()
      this.errorMessage=""
      for(const [key,value] of Object.entries(this.choice)){
          this.choice[key]=null
        } 
    }
  },
};
</script>