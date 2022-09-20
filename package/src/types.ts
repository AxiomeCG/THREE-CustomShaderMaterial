import * as THREE from 'three'

export type MaterialConstructor = new (opts: { [key: string]: any }) => THREE.Material
type MaterialParams<T extends MaterialConstructor> = ConstructorParameters<T>[0]

export interface iCSMPatchMap {
  [keyword: string]: {
    [toReplace: string]: string
  }
}

export type iCSMParams<T extends MaterialConstructor> = {
  baseMaterial: T | InstanceType<T>
  vertexShader?: string
  fragmentShader?: string
  cacheKey?: () => string
  patchMap?: iCSMPatchMap
  uniforms?: { [key: string]: THREE.IUniform<any> }
} & MaterialParams<T>

export type iCSMUpdateParams<T extends MaterialConstructor> = Partial<Omit<iCSMParams<T>, 'base'>>

export interface iCSMInternals<T extends MaterialConstructor> {
  patchMap: iCSMPatchMap
  fragmentShader: string
  vertexShader: string
  cacheKey: (() => string) | undefined
  baseMaterial: T | InstanceType<T>
  instanceID: string
  type: string
}

export type Uniform = { [key: string]: THREE.IUniform<any> }

export interface iCSMShader {
  defines: string
  header: string
  main: string
}