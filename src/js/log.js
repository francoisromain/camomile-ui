export default {
  simple (key, value) {
    console.log(
      `%c| ${key}: %c${value}`, // eslint-disable-line camelcase
      'padding:8px 0; color:#666; line-height:24px;',
      'padding:8px 32px 8px 0; color:#f40; line-height:24px;'
    )
  },
  button (key, value) {
    console.log(
      `%c${key} %c${value}`,
      'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 24px; line-height:96px; margin-left: 4px; border-radius: 8px 0 0 8px; color:#333; background:linear-gradient(to bottom, #E5E4E5, #CFCFCF); text-shadow: -1px -1px 1px #ccc,  1px 1px 3px #fff;',
      'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 12px; line-height:96px; text-decoration: none; color:#fff; background:linear-gradient(to bottom, #f62, #f30); text-shadow: -1px -1px 1px #a50,  1px 1px 3px #fa0; border-radius: 0 8px 8px 0; '
    )
  }
}
