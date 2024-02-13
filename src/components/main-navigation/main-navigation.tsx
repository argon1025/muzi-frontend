import {ReactComponent as Logo} from '../../resources/logo.svg'

const MainNavigation = ()=> {
    return (
        <div>
        <div className="flex justify-center h-16 w-full px-2.5 py-5">
            <div className='w-full max-w-7xl'>
                <div className='flex items-center w-full max-w-7xl cursor-pointer' onClick={()=> window.location.href = '/'}>
                    <Logo className='mr-2' /><span className="text-2xl text-sky-400 align-middle">체험단무지</span>
                </div>
                <div className='ml-auto'></div>
            </div>
        </div>
        <div className='flex w-full h-9 bg-sky-100 justify-center items-center'>
            <span className='text-sky-400 text-base'>블로그 체험단의 모든것을 모아보는 체험단무지</span>
        </div>
        </div>
    )
}

export default MainNavigation;