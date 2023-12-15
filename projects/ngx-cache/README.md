## @juangura19/ngx-cache

Esta libreria permite la gestion de cache sobre el navegador. intercepta las peticiones GET y base a una lista de servicios (apis) las va almacenando en la cache con tiempo de caducidad. adicional si no se desea hacer uso del interceptor puedes usar los metodos para gestionar tu cache.

### Install
```bash
  npm install @juangura19/ngx-cache
```

### Input

| parameter | type  | description | example |
| :-------- | :------- | :------- | :------- |
| base | `string` | url base de servicio | `https://example.com` |
| path | `string` | recurso  | `/example` |
| ttl | `number` | tiempo de vigencia del dato | `3600` |
| type | `NgxCacheEnum` | tipo de almacenamiento en el storage, por defecto se almacena en el `sessionstorage` | `NgxCacheEnum.sessionstorage` |

### Usage/Examples

```javascript
import { NgxCacheModule, NgxCacheEnum } from '@juangura19/ngx-cache';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...,
    NgxCacheModule.forRoot([
      { base: 'https://example.com', path: "/example1", ttl: 3600, type: NgxCacheEnum.sessionstorage},
      { base: 'https://example.com', path: "/example2", ttl: 360, type: NgxCacheEnum.localstorage },
      { base: 'https://example.com', path: "/example3", ttl: 0, type: NgxCacheEnum.cookie  }
      { base: 'https://example.com', path: "/example4", ttl: 60 }
    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Cache

almacenamiento por para session storiga y local storage

| Key | Value  | Description |
| :-------- | :------- | :------- |
| `https://example.com/example` | `"{...data...}"` | Data almacenada |
| `https://example.com/example-cas` | `1700201255139` | Fecha de creación en formato `number` |

almacenamiento cookie, si el ttl es 0, el valor se eliminara cuando se cierra el explorador

| Key | Value  | Description |
| :-------- | :------- | :------- |
| `https://example.com/example` | `"{...data...}"` | Data almacenada |


### Metodos adicionales

Si no desea usar hacer uso del interceptor, no es necesario importar el modulo y podrias hacer uso del los metodos que se pone a disposicion para el manejo de cache.

| Metodo | input  | descripcion |
| :-------- | :------- | :------- | 
| `find` | `key, ttl, type` | permite obtener datos de la cache y valida si los datos estan vigentes en base al ttl enviado  | 
| `save` | `key, data, type` | permite guardar los datos en cache |
| `remove` | `key, type` | permite remover los datos de cache incluido su ttl |

```javascript
import { NgxCacheService, NgxCacheEnum } from '@juangura19/ngx-cache';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    ...,
    private readonly ngxCacheService:NgxCacheService
    ...
  ) {}

  remove = () => {
    //el tipo de almancenamiento es opcional, por defecto va apuntar al sessionstorage
    this.ngxCacheService.remove('https://example.com/example', NgxCacheEnum.localstorage)
  }

  save = () => {
    //el tipo de almancenamiento es opcional, por defecto va apuntar al sessionstorage
    this.cacheService.save('https://example.com/example', {...data...}, NgxCacheEnum.localstorage)
  }

  find = () => {
    //el tipo de almancenamiento es opcional, por defecto va apuntar al sessionstorage
    this.cacheService.find('https://example.com/example',100, NgxCacheEnum.localstorage)
  }
}

```

### Authors

- [@juangura19](https://github.com/juangura19)