import Queue from 'bull'

export const processTransfer = new Queue('process transfer')
