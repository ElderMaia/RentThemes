<script setup>
import Nav from '../../components/Nav.vue';
import api from '../../services/api.js';
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <section class="container-title">
            <h1>Cadastro de Cliente</h1>
            <svg-icon type="mdi" style="color: #501589" :size="30" class="icone" :path="iconGroup"></svg-icon>
        </section>
        <div class="container-form">
            <label for="nome">Nome</label>
            <input type="text" class="input-text" v-model="cliente.name" placeholder="Preencher com nome completo ..."
                name="nome" id="nome" required>
            <label for="email">E-mail</label>
            <input type="text" class="input-text" v-model="cliente.email" placeholder="Exemplo: nome@email.com ..."
                name="email" id="email" required>
            <div class="actions">
                <v-btn class="secundary" v-bind="props" @click="this.$router.push('/clientes');">
                    Cancelar / Voltar
                </v-btn>

                <v-btn class="bnt" v-if="!editable" v-bind="props" @click="postCliente()">
                    Salvar
                </v-btn>

                <v-btn class="bnt" v-else v-bind="props" @click="updateCliente()">
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
            cliente: {
                name: '',
                email: ''
            },
            editable: false,

        }
    },
    created() {
        if (this.$route.params.id != null || undefined) {
            console.log('to no if', this.$route.params.id);
            this.getCliente(this.$route.params.id);
            this.editable = true;
        }
    },
    methods: {
        exibirToast() {
            toast("Cliente cadastrado com sucesso!", {
                autoClose: 1000,
                type: 'success'
            }); // ToastOptions
        },
        postCliente() {
            api
                .post("/clients/", this.cliente)
                .then(() => {
                    this.exibirToast();
                    console.log('cliente cadastrado com sucesso.')
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getCliente(id) {
            api
                .get("/clients/" + id + "/")
                .then((resp) => {
                    console.log(resp.data);
                    this.cliente.name = resp.data.name;
                    this.cliente.email = resp.data.email;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateCliente() {
            api
                .put(`/clients/${this.$route.params.id}/`, this.cliente)
                .then(() => {
                    toast("Cliente atualizado com sucesso!", {
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
    color: #501589;
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
    color: #CF3A69;
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
  