const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class for EasySave blocks
 * @constructor
 */
class jgEasySaveBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: 'jgEasySave',
            name: 'Easy Save',
            color1: '#48a3d4',
            color2: '#3d89b3',
            blocks: [
                {
                    blockType: BlockType.LABEL,
                    text: "Saving"
                },
                {
                    opcode: 'addVarToSave',
                    text: 'add variable [VAR] to save',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        VAR: {
                            menu: "variable"
                        }
                    }
                },
                {
                    opcode: 'addListToSave',
                    text: 'add list [LIST] to save',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        LIST: {
                            menu: "list"
                        }
                    }
                },
                {
                    blockType: BlockType.LABEL,
                    text: "Loading"
                },
            ],
            menus: {
                variable: {
                    items: [],
                    variableType: "scalar"
                },
                list: {
                    items: [],
                    variableType: "list"
                },
            }
        };
    }

    
}

module.exports = jgEasySaveBlocks;
