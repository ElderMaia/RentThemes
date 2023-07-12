import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import Itens from '../views/Itens/Itens.vue'
import FormItens from '../views/Itens/FormItens.vue'
import Temas from '../views/Temas/Temas.vue'
import FormTemas from '../views/Temas/FormTemas.vue'
import Clientes from '../views/Clientes/Clientes.vue'
import FormClientes from '../views/Clientes/FormClientes.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    // Caminhos para Itens
    {
      path: '/itens',
      name: 'itens',
      component: Itens
    },
    {
      path: '/form-itens',
      name: 'form-itens',
      component: FormItens
    },
    {
      path: '/edit-itens/:id',
      name: 'edit-itens',
      component: FormItens
    },
    // Caminhos para Temas
    {
      path: '/temas',
      name: 'temas',
      component: Temas
    },
    {
      path: '/form-temas',
      name: 'form-temas',
      component: FormTemas
    },
    {
      path: '/edit-temas/:id',
      name: 'edit-temas',
      component: FormTemas
    },
    // Caminhos para Clientes
    {
      path: '/clientes',
      name: 'clientes',
      component: Clientes
    },
    {
      path: '/form-clientes',
      name: 'form-clientes',
      component: FormClientes
    },
    {
      path: '/edit-clientes/:id',
      name: 'edit-clientes',
      component: FormClientes
    }
  ]
})

export default router
