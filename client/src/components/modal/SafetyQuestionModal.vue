<template >
  <div class="search-board-result">
    <h4 class="animated fadeIn slow">
       {{ $t('welkom') }} {{contact.Name}} !
    </h4>
    <div class="search-board-result-actions">
      <el-button 
        class="btn grey accent-4 animated slideInUp slow safety"
        type="text" 
        @click="centerDialogVisible = true">
        {{ $t('zie_contract') }}
        <i class="fa fa-print"></i>
      </el-button>
      <clear-btn/>
    </div>

    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="34%"
      center>

      <span>{{ $t('safety_intro')}}</span>
      <div class="safety-input-box">
        <el-input :placeholder="placeholder" type="number" class="safety-dialog-postcode" v-model="postcode"></el-input>
        <span 
          v-show="errorMsg"
          class="safety-error-msg"
          >
          {{ $t('safety_error')}}
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{ $t('safety_cancel')}}</el-button>
        <el-button type="primary" class="safety-btn-confirm" @click="validate">{{ $t('safety_confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ClearBtn from '@/components/buttons/Clear'

  export default {
    name: 'safety-question-modal',
    data() {
      return {
        centerDialogVisible: false,
        postcode: null,
        errorMsg: false
      };
    },
    components: {
      ClearBtn
    },
    computed: {
      ...mapGetters(['currContract', 'contact', 'locale']),
      title(){
        const msg = this.locale === "fr" ? "Important!" : "Belangrijk!"
        return msg
      },
      placeholder(){
        const msg = this.locale === "fr" ? "Entrez votre code postal e-mail ici" : "Geef hier uw postcode in"
        return msg
      }
    },
     methods: {
      ...mapActions(['changeLoading', 'findContract']),
      validate(){
        if (!this.postcode) this.errorMsg = true
        else if(this.postcode.replace(/\s/g, "") === this.contact.MailingAddress.postalCode) this.viewContract(this.contact.External_Id__c)
        else this.errorMsg = true
      },
      async viewContract(id) {
        this.changeLoading(true)
        if(!this.currContract) {
          await this.findContract(id)
          this.changeLoading(false)
          this.$router.push({ name: 'printContract', params: {id} })
        } else {
          this.changeLoading(false)
          this.$router.push({ name: 'printContract', params: {id} })
        }
      },
    }
  };
</script>

<style lang="scss">

  .search-board-result {
        margin: 0 auto;
        width: 100%;
        margin-top: 50px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        .search-board-result-actions {
          height: 55px;
          p {
            font-size: 13px;
            margin-top: 14px;
          }

          .reset {
            font-weight: 700;
            cursor: pointer;
          }

        }
        .safety-input-box {
          display: flex;
          flex-direction: column;

          .safety-error-msg {
            color: #e53935;
          }
        }
        
        .el-button.safety {
          margin-top: 15px;
          min-width: 250px;
          color: #fff;
          padding-bottom: 30px;
          &:hover {
            color: #fff;
            opacity: 0.9;
          }
        }

        .safety-btn-confirm {
          background: #0080C8;
        }

        .el-input {
          margin-top: 20px;
          width: 43%;
        }
      }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance:textfield;
  }
</style>