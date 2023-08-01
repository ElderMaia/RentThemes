<script setup>
import Nav from '../../components/Nav.vue';
import api from '../../services/api.js';
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <section class="container-title">
            <h1>Cadastro de Aluguel</h1>
            <svg-icon type="mdi" style="color: #A73C8C" :size="30" class="icone" :path="iconGroup"></svg-icon>
        </section>
        <div class="container-form">
            <label for="date">Data</label>
            <input type="date" class="input-text" v-model="alugueis.date" placeholder="Preencher com a data de início do aluguel..."
                date="data" id="data" required>
            <label for="start_hours">Hora Início</label>
            <input type="time" class="input-text" v-model="alugueis.start_hours" placeholder="Preencher com hora do início do aluguel..."
                name="start_hours" id="start_hours" required>
            <label for="end_hours">Hora Fim</label>
            <input type="time" class="input-text" v-model="alugueis.end_hours" placeholder="Preencher com hora do fim do aluguel..."
                name="end_hours" id="end_hours" required>
            <label for="theme">Tema</label>
            <input type="text" class="input-text" v-model="alugueis.theme" placeholder="Selecionar o tema para a ser alugado..."
                name="theme" id="theme" required>
            <label for="client">Cliente</label>
            <input type="text" class="input-text" v-model="alugueis.client" placeholder="Selecione quem vai alugar o tema..."
                name="client" id="client" required>
            <label for="address">Endereço</label>
            <input type="text" class="input-text" v-model="alugueis.address" placeholder="Preencher com o endereço do aluguel..."
                name="address" id="address" required>
            
            <label for="number">Número</label>
            <input type="text" class="input-text" v-model="alugueis.number" placeholder="Adcione o Número"
                name="number" id="number" required>
            <label for="complement">Complemento</label>
            <input type="text" class="input-text" v-model="alugueis.complement" placeholder="Adicione um complemento"
                name="complement" id="complement" required>
            <label for="district">Bairro</label>
            <input type="text" class="input-text" v-model="alugueis.district" placeholder="Adicione seu bairro"
                name="district" id="district" required>
            <label for="city">Cidade</label>
            <input type="text" class="input-text" v-model="alugueis.city" placeholder="Adicione sua cidade"
                name="city" id="city" required>
            <label for="state">Estado</label>
            <input type="text" class="input-text" v-model="alugueis.state" placeholder="Seu estado"
                name="state" id="state" required>

            <div class="actions">
                <v-btn class="secundary" v-bind="props" @click="this.$router.push('/alugueis' );">
                    Cancelar / Voltar
                </v-btn>

                <v-btn class="bnt" v-if="!editable" v-bind="props" @click="postAlugueis()">
                    Salvar
                </v-btn>

                <v-btn class="bnt" v-else v-bind="props" @click="updateAlugueis()">
                    Atualizar
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {

    components: {
        SvgIcon
    },
    data() {
        return {
            iconGroup: mdiAccount,
            alugueis: {
                date: '',
                start_hours: '',
                end_hours: '',
                theme: '',
                client: '',
                address: '',
                number: '',
                complement: '',
                district: '',
                sity: '',
                state: ''
            },
            editable: false,

        }
    },
    created() {
        if (this.$route.params.id != null || undefined) {
            console.log('to no if', this.$route.params.id);
            this.getAlugueis(this.$route.params.id);
            this.editable = true;
        }
    },
    methods: {
        exibirToast() {
            toast("Aluguel cadastrado com sucesso!", {
                autoClose: 1000,
                type: 'success'
            }); // ToastOptions
        },
        postAlugueis() {
            api
                .post("/rents/", this.alugueis)
                .then(() => {
                    this.exibirToast();
                    console.log('Aluguel cadastrado com sucesso.')
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getAlugueis(id) {
            api
                .get("/rents/" + id + "/")
                .then((resp) => {
                    console.log(resp.data);
                    this.alugueis.name = resp.data.name;
                    this.alugueis.email = resp.data.email;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateAlugueis() {
            api
                .put(`/rents/${this.$route.params.id}/`, this.alugueis)
                .then(() => {
                    toast("Aluguel atualizado com sucesso!", {
                        autoClose: 1000,
                        type: 'success'
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }
}
</script>
<style scoped>
.container-page {
    margin: 4em;
    padding: 1em;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    border-radius: 10px;
}

.container-title {
    display: flex;
    color: #A73C8C;
    font-weight: bold !important;
    margin-left: 4em;
}

.icone {
    align-self: center;
    margin-left: 5px;
}

h1 {
    font-weight: bold !important;
}

.actions {
    display: flex;
    align-self: flex-end;
}

.container-form {
    width: 46vw;
    margin: 0% auto;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
}

.input-text {
    border: 1px rgb(156, 152, 152) solid;
    border-radius: 5px;
    padding: 0.3em;
    margin-bottom: 1em;
}

label {
    color: #A73C8C;
    font-weight: bold;
}

.bnt {
    align-self: flex-end;
    background-color: #7E9417;
    color: white;
    font-weight: bold !important;
}

.v-btn__content,
.v-btn__prepend,
.v-btn__append {
    font-weight: 600;
}

.secundary {
    background-color: rgb(199, 199, 199);
    color: white;
    margin-right: 1em;
}
</style>
  