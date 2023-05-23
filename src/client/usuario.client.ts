import axios, { AxiosInstance } from "axios";

import { Usuario } from "@/model/usuario";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export class UsuarioClient {

  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/usuario',
      headers: { 'Content-type': 'application/json' }
    });
  }

  public async findById(id: number): Promise<Usuario> {
    try {
      return (await this.axiosClient.get<Usuario>(`/${id}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async cadastrar(usuario: Usuario): Promise<void> {
    try {
      return (await this.axiosClient.post('/', usuario))
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async editar(usuario: Usuario): Promise<void> {
    try {
      return (await this.axiosClient.put(`/${usuario.id}`, usuario)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async desativar(usuario: Usuario): Promise<void> {
    try {
      return (await this.axiosClient.put(`/desativar/${usuario.id}`, usuario)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Usuario>> {
    try {
      let requestPath = ''

      requestPath += `?page=${pageRequest.currentPage}`
      requestPath += `&size=${pageRequest.pageSize}`
      requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

      return (await this.axiosClient.get<PageResponse<Usuario>>(requestPath, { params: { filtros: pageRequest.filter } })).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
}