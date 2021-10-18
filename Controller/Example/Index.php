<?php
/******************************************************
 * @package Magento 2 Ui
 * @author https://magefox.com
 * @copyright (C) 2021 - Magefox.Com
 * @license MIT
 *******************************************************/

namespace Magefox\Ui\Controller\Example;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\App\ResponseInterface;
use Magento\Framework\Controller\ResultInterface;
use Magento\Framework\View\Result\PageFactory as ResultPageFactory;

class Index extends Action
{
    /**
     * @var ResultPageFactory
     */
    private $resultPageFactory;

    /**
     * Constructor
     *
     * @param Context $context
     * @param ResultPageFactory $resultPageFactory
     */
    public function __construct(
        Context $context,
        ResultPageFactory $resultPageFactory
    ) {
        $this->resultPageFactory = $resultPageFactory;

        parent::__construct($context);
    }

    /**
     * Execute example controller
     *
     * @return ResponseInterface|ResultInterface
     */
    public function execute()
    {
        return $this->resultPageFactory->create();
    }
}
