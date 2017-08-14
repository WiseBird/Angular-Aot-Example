module.exports = function (source) {
    let parts = this.request.split('!');
    console.log('Custom loader for:', parts[parts.length - 1]);

    return source + ' <h3>From custom loader</h3>';
};
