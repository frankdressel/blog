set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim/
call vundle#begin()

" let Vundle manage Vundle
" required!
Plugin 'VundleVim/Vundle.vim'
Plugin 'gmarik/vundle'
Plugin 'Lokaltog/powerline', {'rtp': 'powerline/bindings/vim/'}
Plugin 'scrooloose/nerdtree'
" Plugin 'klen/python-mode'
Plugin 'jnurmine/Zenburn'
Plugin 'scrooloose/syntastic'
Plugin 'kien/ctrlp.vim'
Plugin 'gabrielelana/vim-markdown'
Plugin 'davidhalter/jedi-vim'
call vundle#end()

filetype plugin indent on
autocmd FileType yaml setl indentkeys-=<:>

syntax on

" Powerline setup
set guifont=DejaVu\ Sans\ Mono\ for\ Powerline\ 9
set laststatus=2

map <F2> :NERDTreeToggle<CR>

" Python-mode setup
" let g:pymode_rope = 1
" 
" let g:pymode_doc = 1
" let g:pymode_doc_key = 'K'
" 
" let g:pymode_lint = 1
" let g:pymode_lint_checker = "pyflakes,pep8"
" 
" let g:pymode_lint_write = 1
" 
" let g:pymode_virtualenv = 1
" 
" let g:pymode_breakpoint = 1
" let g:pymode_breakpoint_bind = '<leader>b'
" 
" let g:pymode_syntax = 1
" let g:pymode_syntax_all = 1
" let g:pymode_syntax_indent_errors = g:pymode_syntax_all
" let g:pymode_syntax_space_errors = g:pymode_syntax_all
" 
" let g:pymode_folding = 0

set autochdir

set tabstop=4
set shiftwidth=4
set expandtab

set t_Co=256
" Taken from: https://sanctum.geek.nz/arabesque/gracefully-degrading-vimrc/
silent! colors zenburn

set number

" Ctrl-P
nmap ; :CtrlPBuffer<CR>

" Syntastic
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

" Taken from: https://robots.thoughtbot.com/vim-splits-move-faster-and-more-naturally
" * Ctrl+j/k lets you navigate the splits
nmap <C-J> <C-W><C-J>
nmap <C-K> <C-W><C-K>
nmap <C-L> <C-W><C-L>
nmap <C-H> <C-W><C-H>
" * Split is right and below
set splitbelow
set splitright

" Taken from: http://statico.github.io/vim.html
nmap j gj
nmap k gk

set incsearch
set ignorecase
set smartcase
set hlsearch
nmap \q :nohlsearch<CR>
