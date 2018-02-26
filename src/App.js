import React from 'react'
import GncText from './GncText'

export default class extends React.Component {
    render () {
        return (           
                <div
                >
                    <div
                        className='topbar'
                    >
                        <div
                            className='welcometopbar'
                        >
                            <div
                                className='logo-container'
                            >
                                <div
                                    className='logo'
                                ></div>
                            </div>
                            <div>
                                <button
                                    className='login-button'
                                >
                                    LOG IN
                                </button>
                            </div>
                        </div>
                        <div
                            className='topmenu'
                        >
                            <div
                                className='topmenu-item'
                            >
                                Home
                            </div>
                            <div
                                className='topmenu-item selected'
                            >
                                Images
                            </div>
                            <div
                                className='topmenu-item'
                            >
                                Lectures
                            </div>
                        </div>
                    </div>
                    <div
                        className='main-banner'
                    >
                        <div
                            className='main-banner-hero'
                        >
                            <div
                                className='main-banner-hero-title'
                            >
                                We Write
                            </div>
                            <div
                                className='main-banner-hero-description'
                            >
                                <GncText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis. Nibh cras pulvinar mattis nunc.
                                </GncText>                            
                            </div>
                        </div>

                        <div
                            className='main-banner-image'
                        >
                            <div
                                className='main-banner-image-mask'
                            ></div>
                        </div>                        
                    </div>
                </div>                
        );
    }
}