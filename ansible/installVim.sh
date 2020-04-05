cd /tmp/vim
./configure --with-features=huge --enable-multibyte --enable-rubyinterp --enable-python3interp --with-python3-config-dir=$(bash python3-config --configdir) --enable-perlinterp --enable-gui=gtk2 --enable-cscope --prefix=/usr
make VIMRUNTIMEDIR=/usr/share/vim/vim82
make install
