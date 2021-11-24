/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export function initiateScan() {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const response = await $axios.get(`/scan/initiate-scan`)
            resolve(response.data.data)
        } catch (error) {
            reject(error)
        }
    })
}

export function fetchAllScans(ecrId: String) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const response = await $axios.get(`/scan/fetch-scans`)
            resolve(response.data.data.docs)
        } catch (error) {
            reject(error)
        }
    })
}
export function fetchScanInfo(formId: String) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const response = await $axios.get(`/scan/scan-info/${formId}`)
            resolve(response.data.data)
        } catch (error) {
            reject(error)
        }
    })
}
export function completeScan(formId: String) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const response = await $axios.get(`/scan/complete-scan/${formId}`)
            resolve(response.data.data)
        } catch (error) {
            reject(error)
        }
    })
}
export function updateScan(requestBody: Object) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const response = await $axios.get(`/scan/update-scan`, requestBody)
            resolve(response.data.data)
        } catch (error) {
            reject(error)
        }
    })
}
