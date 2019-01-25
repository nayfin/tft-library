import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  schematic
} from '@angular-devkit/schematics';

export default function(options: any): Rule {
  // const plain = options.plain;
  // const withModule = options.withModule;
  // const withContentManagement = options.withContentManagement;
  const {plain, withModule, withContentManagement } = options;
  let files = [
    schematic(plain ? 'store' : 'entity-store', {
      flat: options.flat,
      name: options.name,
      path: options.path,
      project: options.project,
      dirName: options.dirName,
      feature: true,
      spec: options.spec
    }),
    schematic(plain ? 'query' : 'entity-query', {
      flat: options.flat,
      name: options.name,
      path: options.path,
      project: options.project,
      spec: options.spec,
      dirName: options.dirName,
      feature: true
    }),
    schematic('service', {
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
    schematic('state-barrel', {
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
      schematic('model', {
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
      schematic('withModule', {
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

      schematic('list', {
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

      schematic('form', {
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

      schematic('new', {
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

      schematic('edit', {
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

      schematic('copy', {
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
  return (host: Tree, context: SchematicContext) => {
    return chain(files)(host, context);
  };
}
