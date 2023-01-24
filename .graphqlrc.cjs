/**
 * Configures the GraphQL language server for all the function schemas in this repo.
 */
const fs = require('node:fs');

function getProjects(path) {
    const projects = {}

    const extensions = fs.readdirSync(`./${path}`);
    for (const entry of extensions) {
        const extensionPath = `./${path}/${entry}`;
        const schema = `${extensionPath}/schema.graphql`;
        if(!fs.existsSync(schema)) {
            continue;
        }

        const projectName = extensionPath.substring(2).replaceAll('/', '-');
        projects[projectName] = {
            schema,
            documents: `${extensionPath}/input.graphql`
        }
    }
    
    return projects;
}

const projects = {
    ...getProjects("sample-apps/discounts-tutorial/extensions"),
    ...getProjects("sample-apps/discounts/extensions"),
    ...getProjects("checkout/rust/delivery-customization"),
    ...getProjects("checkout/rust/payment-customization"),
    ...getProjects("discounts/rust/order-discounts"),
    ...getProjects("discounts/rust/product-discounts"),
    ...getProjects("discounts/rust/shipping-discounts"),
}

module.exports = {
    projects
};