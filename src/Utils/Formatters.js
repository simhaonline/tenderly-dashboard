/**
 * @param {string} projectName
 * @return {string}
 */
export const formatProjectSlug = projectName => {
   return projectName.toLowerCase().replace(/[\W_]+/g, "-");
};
