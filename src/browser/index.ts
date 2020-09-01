import { Component } from '@malagu/core';
import { ApplicationShell } from '@malagu/core/lib/browser';
import Vue from 'vue';
import svelteApp from './svelte/App.svelte';
import vueApp from './vue/App.vue';

@Component({ id: ApplicationShell, rebind: true })
export class Shell implements ApplicationShell {
    attach(host: HTMLElement): void {
        const svelteWrapper = document.createElement('div');
        svelteWrapper.style.cssText = `height:50vh`;

        const vueWrapper = document.createElement('div');
        host.appendChild(svelteWrapper);
        host.appendChild(vueWrapper);

        new svelteApp({
            target: svelteWrapper,
            props: {
                name: 'world',
            },
        });
        new Vue(vueApp).$mount(vueWrapper);
    }
}
