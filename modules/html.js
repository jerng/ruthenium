'use strict'

const mark      = require ( '/var/task/modules/mark.js' )

const html      =  {
        
        //  Priorities for (rus.html.form) :
        //
        //  -   Throw errors if critical attributes, etc. are missing.
        //  -   Automatically close tags.
        //  -   Reduce markup to be typed.
        //  -   Do not be more specific than necessary.
        //
        //  Design decisions:
        //
        //  -   (fieldset) is used arbitrarily; so it is left out here;
        //  -   (label) is often adjacent to its (id)-ed element, but this is
        //      also not necessary, so it is also left out here;
        //
        //
        
        
        form :  async conf => {
            
            if ( ! conf.action ) {
                throw Error (`(rus.html.form) called, without (conf.action) `)
            }
            else
            if ( ! conf.innerHTML ) {
                throw Error (`(rus.html.form) called, without (conf.innerHTML) `)
            }
            
            const defaults = {
                method: 'POST'
            }
            
            const markup 
                = `<form    method=${ conf.method ? conf.method : defaults.method }
                            action=${ conf.action }
                            class=${ conf.class }
                            >
                            ${ conf.innerHTML }
                            </form>`
            return markup
        },
        
        input : async conf => {
            
            if ( ( ! conf.name ) && ( ! conf.type == 'submit' ) ) {
                throw Error (`(rus.html.input) called, without (conf.name) `)
            }
            else
            if ( conf.labelInnerHTML && ( ! conf.id ) ) {
                throw Error (`(rus.html.input) called, (conf.labelInnerHTML) without (conf.id)`)
            }
            
            const defaults = {
                type: 'text'
            }
            
            const markup 
                = ` ${  conf.label 
                        ? `<label   for="${ conf.id }"
                                    > 
                                    ${ conf.label }
                                    </label>` 
                        : ``
                    }
                    <input  type="${ conf.type ? conf.type : defaults.type }"
                            ${ conf.name        ? `name="${conf.name}"` 
                                                : '' }"
                            ${ conf.placeholder ? `placeholder="${conf.placeholder}"`
                                                : '' }
                            ${ conf.id          ? `id="${conf.id}"`
                                                : '' }
                            ${ conf.required    ? 'required'
                                                : '' }
                            ${ conf.value       ? `value="${ conf.value }"` 
                                                : '' }
                            >`
                            
            return markup
        },
/*        
        select : conf => {
            
            if ( ! conf.name ) {
                throw Error (`(rus.html.input) called, without (conf.name) `)
            }
            else
            if ( conf.labelInnerHTML && ( ! conf.id ) ) {
                throw Error (`(rus.html.input) called, (conf.labelInnerHTML) without (conf.id)`)
            }
            
            const defaults = {
                type: 'text'
            }
            
            const markup 
                = ` ${  conf.label 
                        ? `<label   for="${ conf.id }"
                                    > 
                                    ${ conf.label }
                                    </label>` 
                        : ``
                    }
                    <input  type="${ conf.type ? conf.type : defaults.type }"
                            name="${ conf.name }"
                            ${ conf.placeholder ? conf.placeholder : '' }
                            ${ conf.id ? conf.id : '' }
                            ${ conf.required ? 'required' : '' }
                            >`
                            
            return markup
        },

        table : conf => {
        }

*/        
    }
    
module.exports  = html
mark (`~/modules/html.js LOADED`)