const getCurrentTime = () => {
  const currentTimeMs = new Date().toISOString();
  const strippedTime = currentTimeMs.replace(/[-:T.Z]/g, "").slice(0, 14);
  return strippedTime;
};

module.exports = { getCurrentTime };
