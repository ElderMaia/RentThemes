<script setup>
import Nav from '../../components/Nav.vue';
import api from '../../services/api.js';
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <section class="container-title">
            <h1>Lista de Clientes</h1>
            <svg-icon type="mdi" style="color: #501589" :size="30" class="icone" :path="iconParty"></svg-icon>
        </section>
        <v-btn class="bnt" v-bind="props" @click="this.$router.push('/form-clientes');">
            Novo Cliente
        </v-btn>
        <section class="container-page">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Código
                        </th>
                        <th class="text-left">
                            Nome
                        </th>
                        <th class="text-left actions-header">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in clientes" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td class="actions">
                            <svg-icon type="mdi" style="color: #174e66" :size="22" class="iconTable" :path="iconEdit" @click="this.goToEdit(item.id);" ></svg-icon>


                            <v-dialog v-model="dialog" persistent width="auto">
                                <template v-slot:activator="{ props }">
                                    <svg-icon type="mdi" style="color: #174e66" :size="22" @click="this.idForDelete=item.id" class="iconTable" v-bind="props"
                                        :path="iconDelete"></svg-icon>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h5">
                                        Excluir este Cliente?
                                    </v-card-title>
                                    <v-card-text>
                                        Você deseja realmente apagar este cliente? Esta ação é irreversível.
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red" variant="text" @click="dialog = false">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="green-darken-1" variant="text" @click="deleteCliente(idForDelete)">
                                            Confirmar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </section>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount, mdiPencilOutline, mdiTrashCanOutline, mdiEyeOutline } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            iconParty: mdiAccount,
            iconEdit: mdiPencilOutline,
            iconDelete: mdiTrashCanOutline,
            iconDetail: mdiEyeOutline,
            clientes: [],
            dialog: false,
            idForDelete: null,
        }
    },
    created() {
        this.getClientes();
    },
    methods: {
        getClientes() {
            api
                .get("/clients/")
                .then((res) => {
                    this.clientes = res.data;
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteCliente(id) {
            api
                .delete(`/clients/${id}/`)
                .then(() => {
                    console.log('Item excluido');
                    this.getClientes();
                    this.dialog = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        goToEdit(id){
            this.$router.push({ name: 'edit-clientes', params: { id: id }});
        }
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

.bnt {
    background-color: #0066FF;
    margin-right: 4em;
    color: white;
    float: right;
}

.iconTable {
    margin-left: 1em;
}

.actions {
    width: 15vw;
}
</style>
  