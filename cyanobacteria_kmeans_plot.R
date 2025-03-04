## Revised kmeans cluster plot

# Libraries
# devtools::install_github("SwampThingPaul/AnalystHelper")
library(AnalystHelper)
library(MetBrewer)

# Read the JavaScript file
js_text <- readLines("cyanobacteria-kmeans-analysis.js",warn=F)
# filter and clean data
js_text <- js_text[64:117]
js_text <- js_text[grep("\\{.*\\}",js_text)]

# split data into dataframe
dat <- data.frame(Date = strsplit(js_text,"\\{|:|,")|>sapply("[",3),
                  cluster = strsplit(js_text,"\\{|:|,")|>sapply("[",5))
# format Date
dat$Date <- gsub(' \"|\"','',dat$Date)
dat$Date <- as.Date(as.character(dat$Date))
# format cluster (as a number)
dat$cluster <- as.numeric(dat$cluster)
dat <- dat[order(dat$Date),]

## Plot
# Set y and x limits, major and minor ticks
ylim.vals <- c(-0.5,5.5);ymaj <- c(0:5)
xlim.vals <- as.Date(c("2009-08-01","2020-12-31"));xmaj <- seq(xlim.vals[1],xlim.vals[2],"2 years");xmin <- seq(xlim.vals[1],xlim.vals[2],"1 years")

png(filename="cluster.png",width=6.5,height=4,units="in",res=200,type="windows",bg="white")
par(family="serif",mar=c(2,2,0.5,0.5),oma=c(2,1,1,0.5));

plot(cluster~Date,dat,type = "n",ann=F,axes=F,xlim=xlim.vals,ylim=ylim.vals)
abline(h=ymaj,v=xmaj,lty=3,col="grey",lwd=0.5)
lines(cluster~Date,dat,type="s",col="blue",lwd=1.5)
colors <- MetBrewer::met.brewer("Hiroshige",6,direction=-1)
cluster_colors <- colors[dat$cluster+1]
points(cluster~Date,dat,pch=16,col=cluster_colors,lwd=0.5,cex=1.5)
axis_fun(1,xmaj,xmin,format(xmaj,"%Y-%m"),line=-0.5)
axis_fun(2,ymaj,ymaj,ymaj)
box(lwd=1)
mtext(side=2,line=1.75,"Cluster")
mtext(side=1,line=2,"Date (Year-Month)")
mtext(side=3,adj=0,"Temporal Pattern of Cyanobacteria Community Clusters (2009 - 2020)",font=2,cex=0.75)
dev.off()
