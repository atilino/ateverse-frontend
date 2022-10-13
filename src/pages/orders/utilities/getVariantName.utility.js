export const getVariantName = (link) => {
  let variantName = ''
  const linkValidators = {
      live: [/\/live/, /\/videos/, /\/watch/],
  };
  Object.entries(linkValidators).forEach(variants => {
      const valid = variants[1].map((v) => v.test(link)).includes(true)
      if(valid) variantName = variants[0]
  })
  return variantName
}
