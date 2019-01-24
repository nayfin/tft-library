"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    // const plain = options.plain;
    // const withModule = options.withModule;
    // const withContentManagement = options.withContentManagement;
    const { plain, withModule, withContentManagement } = options;
    let files = [
        schematics_1.schematic(plain ? 'store' : 'entity-store', {
            flat: options.flat,
            name: options.name,
            path: options.path,
            project: options.project,
            dirName: options.dirName,
            feature: true,
            spec: options.spec
        }),
        schematics_1.schematic(plain ? 'query' : 'entity-query', {
            flat: options.flat,
            name: options.name,
            path: options.path,
            project: options.project,
            spec: options.spec,
            dirName: options.dirName,
            feature: true
        }),
        schematics_1.schematic('service', {
            flat: options.flat,
            module: options.module,
            name: options.name,
            path: options.path,
            project: options.project,
            spec: options.spec,
            plain,
            dirName: options.dirName,
            feature: true
        }),
        schematics_1.schematic('state-barrel', {
            // flat: options.flat,
            module: options.module,
            name: options.name,
            path: options.path,
            project: options.project,
            // spec: options.spec,
            dirName: options.dirName,
            feature: true
        })
    ];
    if (!plain) {
        files = files.concat([
            schematics_1.schematic('model', {
                flat: options.flat,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                spec: options.spec,
                dirName: options.dirName,
                feature: true
            })
        ]);
    }
    if (withModule || withContentManagement) {
        files = files.concat([
            schematics_1.schematic('withModule', {
                flat: options.flat,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                spec: options.spec,
                dirName: options.dirName,
                feature: true
            }),
        ]);
    }
    if (withContentManagement) {
        files = files.concat([
            schematics_1.schematic('list', {
                flat: options.flat,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                spec: options.spec,
                dirName: options.dirName,
                styleext: options.styleext,
                entity: !options.plain,
                feature: true
            }),
            schematics_1.schematic('form', {
                flat: options.flat,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                spec: options.spec,
                dirName: options.dirName,
                styleext: options.styleext,
                entity: !options.plain,
                feature: true
            }),
            schematics_1.schematic('new', {
                flat: options.flat,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                spec: options.spec,
                dirName: options.dirName,
                styleext: options.styleext,
                entity: !options.plain,
                feature: true
            }),
            schematics_1.schematic('edit', {
                flat: options.flat,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                spec: options.spec,
                dirName: options.dirName,
                styleext: options.styleext,
                entity: !options.plain,
                feature: true
            }),
            schematics_1.schematic('copy', {
                flat: options.flat,
                module: options.module,
                name: options.name,
                path: options.path,
                project: options.project,
                spec: options.spec,
                dirName: options.dirName,
                styleext: options.styleext,
                entity: !options.plain,
                feature: true
            })
        ]);
    }
    return (host, context) => {
        return schematics_1.chain(files)(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map