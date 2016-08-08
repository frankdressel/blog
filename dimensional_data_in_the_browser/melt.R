#!/usr/bin/env Rscript

library(reshape2)
library(data.table)

DT = fread('cat /dev/stdin')
molten<-melt(DT, id.vars = c("Datum Zeit"))
write.csv(molten, stdout(), quote=F)
