#!/bin/sh

yarn backstage-cli versions:bump

yarn backstage-cli versions:bump --pattern '@{backstage,roadiehq,immobiliarelabs,drodil,janus-idp,k-phoen,rsc-labs,enfuse,dweber019}/*'
