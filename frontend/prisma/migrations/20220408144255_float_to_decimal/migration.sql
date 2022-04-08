-- AlterTable
ALTER TABLE `BinanceAssets` MODIFY `amount` DECIMAL(16, 8) NOT NULL,
    MODIFY `averagePrice` DECIMAL(16, 8) NOT NULL;

-- AlterTable
ALTER TABLE `Orders` MODIFY `price` DECIMAL(16, 8) NOT NULL,
    MODIFY `amount` DECIMAL(16, 8) NOT NULL,
    MODIFY `commission` DECIMAL(16, 8) NOT NULL,
    MODIFY `totalBuyed` DECIMAL(16, 8) NOT NULL;
